// Deterministic, dependency-free layout engine for simple directed diagrams
// (flowcharts, trees, hub-and-spoke, small process graphs). Runs entirely at
// build time inside Astro components — no client-side JS, no Mermaid runtime.
//
// It replaces Mermaid's dagre-based layout with a small longest-path layered
// layout (Sugiyama-style, without crossing minimization — unnecessary for the
// small graphs used on this site). Groups ("subgraphs") are laid out
// recursively: each group's members are positioned in an isolated local
// layout first, then the group is treated as a single sized box in the
// parent layout, exactly like Mermaid treats subgraphs.

const CHAR_WIDTH = 6.4; // approx advance width, 13px Inter, per character
const PAD_X = 16;
const PAD_Y = 10;
const MIN_WIDTH = 72;
const MAX_LINE_CHARS = 24;
const LINE_HEIGHT = 16;
const GROUP_PADDING = 18;
const GROUP_LABEL_HEIGHT = 26;

/** Split a label into wrapped lines. Explicit "\n" always breaks. */
function wrapLabel(label) {
  const rawLines = String(label).split('\n');
  const lines = [];
  for (const raw of rawLines) {
    const words = raw.split(' ').filter(Boolean);
    let cur = '';
    for (const w of words) {
      const candidate = cur ? `${cur} ${w}` : w;
      if (candidate.length > MAX_LINE_CHARS && cur) {
        lines.push(cur);
        cur = w;
      } else {
        cur = candidate;
      }
    }
    if (cur) lines.push(cur);
    if (!raw) lines.push('');
  }
  return lines.length ? lines : [''];
}

function measureLabel(label) {
  const lines = wrapLabel(label);
  const longest = Math.max(...lines.map((l) => l.length));
  const width = Math.max(MIN_WIDTH, Math.round(longest * CHAR_WIDTH) + PAD_X * 2);
  const height = lines.length * LINE_HEIGHT + PAD_Y * 2;
  return { lines, width, height };
}

/** DFS-based back-edge removal so a feedback loop can't break level propagation. */
function removeCycleEdges(nodeIds, edges) {
  const adj = new Map(nodeIds.map((id) => [id, []]));
  edges.forEach((e) => adj.get(e.from).push(e.to));
  const state = new Map(nodeIds.map((id) => [id, 0])); // 0=white, 1=gray, 2=black
  const removed = new Set();

  function dfs(u) {
    state.set(u, 1);
    for (const v of adj.get(u)) {
      if (state.get(v) === 1) {
        removed.add(`${u}->${v}`);
      } else if (state.get(v) === 0) {
        dfs(v);
      }
    }
    state.set(u, 2);
  }

  nodeIds.forEach((id) => {
    if (state.get(id) === 0) dfs(id);
  });

  return edges.filter((e) => !removed.has(`${e.from}->${e.to}`));
}

/**
 * Layered layout for a flat set of boxes + directed edges.
 * @param {{id:string,width:number,height:number}[]} boxes
 * @param {{from:string,to:string}[]} edges
 * @param {'TB'|'LR'} direction
 * @param {number} levelGap gap between levels (main axis)
 * @param {number} siblingGap gap between boxes on the same level (cross axis)
 * @returns {{positions: Map<string,{x:number,y:number}>, width:number, height:number}}
 */
function layerBoxes(boxes, edges, direction, levelGap, siblingGap) {
  const idSet = new Set(boxes.map((b) => b.id));
  // Feedback/back-reference edges (e.g. a dashed "improves" loop pointing
  // back upstream) must still be drawn, but must never constrain level
  // assignment. Callers mark those explicitly with `constraint: false`
  // instead of relying on automatic cycle detection, which can otherwise
  // cut an arbitrary — and semantically load-bearing — forward edge.
  const relevant = edges.filter(
    (e) => idSet.has(e.from) && idSet.has(e.to) && e.from !== e.to && e.constraint !== false,
  );
  // Safety net for any cycle that isn't already broken by `constraint: false`.
  const dagEdges = removeCycleEdges(boxes.map((b) => b.id), relevant);

  const adj = new Map();
  const indeg = new Map();
  boxes.forEach((b) => {
    adj.set(b.id, []);
    indeg.set(b.id, 0);
  });
  dagEdges.forEach((e) => {
    adj.get(e.from).push(e.to);
    indeg.set(e.to, (indeg.get(e.to) || 0) + 1);
  });

  const level = new Map();
  boxes.forEach((b) => level.set(b.id, 0));

  // Kahn's algorithm, propagating the longest-path level as we go.
  const indegCopy = new Map(indeg);
  const queue = boxes.filter((b) => indegCopy.get(b.id) === 0).map((b) => b.id);
  const visited = new Set();
  while (queue.length) {
    const id = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    for (const next of adj.get(id)) {
      level.set(next, Math.max(level.get(next), level.get(id) + 1));
      indegCopy.set(next, indegCopy.get(next) - 1);
      if (indegCopy.get(next) === 0) queue.push(next);
    }
  }
  // Any node left unvisited (cycle) keeps its default level 0 — not expected
  // in this site's diagrams, but avoids an infinite loop if it ever occurs.

  const byLevel = new Map();
  boxes.forEach((b) => {
    const lvl = level.get(b.id) ?? 0;
    if (!byLevel.has(lvl)) byLevel.set(lvl, []);
    byLevel.get(lvl).push(b);
  });
  const levels = [...byLevel.keys()].sort((a, b) => a - b);

  const positions = new Map();
  let mainCursor = 0;
  let maxCross = 0;

  for (const lvl of levels) {
    const rowBoxes = byLevel.get(lvl);
    const crossSize = rowBoxes.reduce((sum, b) => sum + (direction === 'TB' ? b.width : b.height), 0)
      + siblingGap * Math.max(0, rowBoxes.length - 1);
    maxCross = Math.max(maxCross, crossSize);

    let crossCursor = -crossSize / 2;
    const mainSize = Math.max(...rowBoxes.map((b) => (direction === 'TB' ? b.height : b.width)));

    for (const b of rowBoxes) {
      const boxCross = direction === 'TB' ? b.width : b.height;
      const boxMain = direction === 'TB' ? b.height : b.width;
      const crossPos = crossCursor + boxCross / 2;
      const mainPos = mainCursor + (mainSize - boxMain) / 2;
      if (direction === 'TB') {
        positions.set(b.id, { x: crossPos, y: mainPos + boxMain / 2 });
      } else {
        positions.set(b.id, { x: mainPos + boxMain / 2, y: crossPos });
      }
      crossCursor += boxCross + siblingGap;
    }
    mainCursor += mainSize + levelGap;
  }

  // Re-center every box's main-axis coordinate the same way as cross-axis,
  // then shift everything so the bounding box starts at (0,0).
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const b of boxes) {
    const p = positions.get(b.id);
    minX = Math.min(minX, p.x - b.width / 2);
    minY = Math.min(minY, p.y - b.height / 2);
    maxX = Math.max(maxX, p.x + b.width / 2);
    maxY = Math.max(maxY, p.y + b.height / 2);
  }
  if (!isFinite(minX)) {
    return { positions, width: 0, height: 0 };
  }
  for (const b of boxes) {
    const p = positions.get(b.id);
    positions.set(b.id, { x: p.x - minX, y: p.y - minY });
  }

  return { positions, width: maxX - minX, height: maxY - minY };
}

/**
 * Lay out a full flowchart spec (nodes + edges + optional groups) and return
 * render-ready geometry: box rects with wrapped label lines, group rects,
 * and edge paths with arrowhead endpoints and label anchor points.
 *
 * @param {{
 *   nodes: {id:string,label:string,variant?:string}[],
 *   edges: {from:string,to:string,label?:string,style?:'solid'|'dashed',arrow?:boolean}[],
 *   groups?: {id:string,label:string,members:string[],direction?:'TB'|'LR'}[],
 *   direction?: 'TB'|'LR'
 * }} spec
 */
export function layoutFlowchart(spec) {
  const direction = spec.direction || 'TB';
  const groups = spec.groups || [];
  const groupedIds = new Set(groups.flatMap((g) => g.members));
  const memberOf = new Map();
  groups.forEach((g) => g.members.forEach((m) => memberOf.set(m, g.id)));

  const nodeById = new Map(spec.nodes.map((n) => [n.id, n]));
  const nodeMeasure = new Map();
  spec.nodes.forEach((n) => nodeMeasure.set(n.id, measureLabel(n.label)));

  // 1. Recursively lay out each group's internal members.
  const groupLayouts = new Map();
  for (const g of groups) {
    const memberBoxes = g.members.map((id) => {
      const m = nodeMeasure.get(id);
      return { id, width: m.width, height: m.height };
    });
    const internalEdges = spec.edges.filter((e) => g.members.includes(e.from) && g.members.includes(e.to));
    const result = layerBoxes(memberBoxes, internalEdges, g.direction || 'TB', levelGap(internalEdges, g.direction || 'TB', 40), 16);
    groupLayouts.set(g.id, result);
  }

  // 2. Build the macro graph: ungrouped nodes + one box per group.
  const macroBoxes = [];
  for (const n of spec.nodes) {
    if (groupedIds.has(n.id)) continue;
    const m = nodeMeasure.get(n.id);
    macroBoxes.push({ id: n.id, width: m.width, height: m.height, kind: 'node' });
  }
  for (const g of groups) {
    const gl = groupLayouts.get(g.id);
    const labelWidth = Math.max(MIN_WIDTH, g.label.length * CHAR_WIDTH + GROUP_PADDING * 2);
    macroBoxes.push({
      id: g.id,
      width: Math.max(gl.width + GROUP_PADDING * 2, labelWidth),
      height: gl.height + GROUP_PADDING * 2 + GROUP_LABEL_HEIGHT,
      kind: 'group',
    });
  }

  const resolveMacro = (id) => (memberOf.has(id) ? memberOf.get(id) : id);
  const macroEdgesRaw = spec.edges
    .filter((e) => resolveMacro(e.from) !== resolveMacro(e.to))
    .map((e) => ({ ...e, from: resolveMacro(e.from), to: resolveMacro(e.to) }));

  const macroLayout = layerBoxes(macroBoxes, macroEdgesRaw, direction, levelGap(macroEdgesRaw, direction, direction === 'TB' ? 64 : 88), 28);

  // 3. Compose final absolute positions for every node and group.
  /** @type {Map<string,{x:number,y:number,width:number,height:number,lines:string[],variant?:string,shape:'node'}>} */
  const nodeBoxes = new Map();
  /** @type {Map<string,{x:number,y:number,width:number,height:number,label:string}>} */
  const groupBoxes = new Map();

  for (const b of macroBoxes) {
    const pos = macroLayout.positions.get(b.id);
    const topLeft = { x: pos.x - b.width / 2, y: pos.y - b.height / 2 };
    if (b.kind === 'node') {
      const n = nodeById.get(b.id);
      const m = nodeMeasure.get(b.id);
      nodeBoxes.set(b.id, {
        x: topLeft.x,
        y: topLeft.y,
        width: b.width,
        height: b.height,
        lines: m.lines,
        variant: n.variant || 'default',
      });
    } else {
      const g = groups.find((gg) => gg.id === b.id);
      groupBoxes.set(b.id, { x: topLeft.x, y: topLeft.y, width: b.width, height: b.height, label: g.label });
      const gl = groupLayouts.get(b.id);
      const innerOriginX = topLeft.x + (b.width - gl.width) / 2;
      const innerOriginY = topLeft.y + GROUP_LABEL_HEIGHT + (b.height - GROUP_LABEL_HEIGHT - gl.height - GROUP_PADDING) / 2;
      for (const memberId of g.members) {
        const lp = gl.positions.get(memberId);
        const m = nodeMeasure.get(memberId);
        const n = nodeById.get(memberId);
        nodeBoxes.set(memberId, {
          x: innerOriginX + lp.x - m.width / 2,
          y: innerOriginY + lp.y - m.height / 2,
          width: m.width,
          height: m.height,
          lines: m.lines,
          variant: n.variant || 'default',
        });
      }
    }
  }

  const nodeExtent = {
    width: Math.max(0, ...[...nodeBoxes.values(), ...groupBoxes.values()].map((b) => b.x + b.width)),
    height: Math.max(0, ...[...nodeBoxes.values(), ...groupBoxes.values()].map((b) => b.y + b.height)),
  };

  // 4. Route edges between the final absolute node boxes (not macro boxes),
  // so edges into/out of a group visually touch the group's boundary.
  const routed = spec.edges.map((e) => {
    const fromIsMember = memberOf.has(e.from);
    const toIsMember = memberOf.has(e.to);
    const sameGroup = fromIsMember && toIsMember && memberOf.get(e.from) === memberOf.get(e.to);

    const fromBox = nodeBoxes.has(e.from) ? nodeBoxes.get(e.from) : groupBoxes.get(e.from);
    const toBox = nodeBoxes.has(e.to) ? nodeBoxes.get(e.to) : groupBoxes.get(e.to);
    if (!fromBox || !toBox) return null;

    // When the edge crosses group boundaries, anchor on the *group* rect
    // instead of the inner node rect, so the arrow doesn't visually cross
    // the group border mid-box.
    const fromRect = !sameGroup && fromIsMember ? groupBoxes.get(memberOf.get(e.from)) : fromBox;
    const toRect = !sameGroup && toIsMember ? groupBoxes.get(memberOf.get(e.to)) : toBox;

    // An edge inside a group follows that group's own direction (an LR
    // chain inside a TB diagram must attach left/right, not top/bottom).
    const edgeDirection = sameGroup ? groups.find((g) => g.id === memberOf.get(e.from)).direction || 'TB' : direction;
    return { ...e, curve: routeEdge(fromRect, toRect, edgeDirection, nodeExtent) };
  }).filter(Boolean);

  // 5. Place edge labels. Midpoints collide on fan-in/fan-out edges, so each
  // label slides along its own curve until it clears every node and every
  // label already placed.
  const obstacles = [...nodeBoxes.values()].map((b) => inflate(b, 2));
  const placed = [];
  for (const e of routed) {
    if (!e.label) continue;
    const width = e.label.length * LABEL_CHAR_WIDTH + LABEL_PAD_X * 2;
    let best = null;
    for (const t of LABEL_POSITIONS) {
      const c = bezierPoint(e.curve, t);
      const box = { x: c.x - width / 2, y: c.y - LABEL_HEIGHT / 2, width, height: LABEL_HEIGHT };
      best ??= box;
      if (![...obstacles, ...placed].some((o) => overlaps(inflate(box, 3), o))) {
        best = box;
        break;
      }
    }
    e.labelBox = best;
    placed.push(best);
  }

  // 6. Normalize: every drawn element — including labels and bowed return
  // loops, which can extend past the node grid — starts at (0,0).
  const extents = [
    ...nodeBoxes.values(),
    ...groupBoxes.values(),
    ...placed,
    ...routed.flatMap((e) => e.curve.map((pt) => ({ x: pt.x, y: pt.y, width: 0, height: 0 }))),
  ];
  const minX = Math.min(...extents.map((b) => b.x));
  const minY = Math.min(...extents.map((b) => b.y));
  const maxX = Math.max(...extents.map((b) => b.x + b.width));
  const maxY = Math.max(...extents.map((b) => b.y + b.height));
  const shift = (b) => ({ ...b, x: b.x - minX, y: b.y - minY });

  return {
    width: maxX - minX,
    height: maxY - minY,
    nodes: [...nodeBoxes.entries()].map(([id, box]) => ({ id, ...shift(box) })),
    groups: [...groupBoxes.entries()].map(([id, box]) => ({ id, ...shift(box) })),
    edges: routed.map(({ curve, labelBox, ...e }) => {
      const [p0, p1, p2, p3] = curve.map(shift);
      return {
        ...e,
        d: `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`,
        labelBox: labelBox && shift(labelBox),
      };
    }),
  };
}

// Labeled edges need room for the label between levels: vertically, two
// stacked labels on a fan-in/fan-out; horizontally, the widest label.
function levelGap(edges, direction, base) {
  const labels = edges.filter((e) => e.label);
  if (!labels.length) return base;
  if (direction === 'TB') return Math.max(base, 96);
  const widest = Math.max(...labels.map((e) => e.label.length * LABEL_CHAR_WIDTH + LABEL_PAD_X * 2));
  return Math.max(base, widest + 32);
}

const LABEL_CHAR_WIDTH = 6.2; // 11px Inter
const LABEL_PAD_X = 6;
const LABEL_HEIGHT = 18;
const LABEL_POSITIONS = [0.5, 0.35, 0.65, 0.25, 0.75, 0.15, 0.85];

function inflate(b, m) {
  return { x: b.x - m, y: b.y - m, width: b.width + m * 2, height: b.height + m * 2 };
}

function overlaps(a, b) {
  return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
}

function bezierPoint([p0, p1, p2, p3], t) {
  const u = 1 - t;
  const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return {
    x: w[0] * p0.x + w[1] * p1.x + w[2] * p2.x + w[3] * p3.x,
    y: w[0] * p0.y + w[1] * p1.y + w[2] * p2.y + w[3] * p3.y,
  };
}

/**
 * Cubic connector [p0, p1, p2, p3] between two axis-aligned rects.
 *
 * A "backward" edge (target does not lie further along the main axis than
 * the source — a feedback loop, or the non-DAG side of a cycle excluded
 * from level assignment) cannot use the normal top/bottom (or left/right)
 * attachment: that S-curve runs back through every level in between.
 * Those edges attach on the side and bow out past the node grid, like a
 * conventional "return" loop.
 */
function routeEdge(fromRect, toRect, direction, extent) {
  const fromCenter = { x: fromRect.x + fromRect.width / 2, y: fromRect.y + fromRect.height / 2 };
  const toCenter = { x: toRect.x + toRect.width / 2, y: toRect.y + toRect.height / 2 };

  if (direction === 'TB') {
    if (toCenter.y < fromCenter.y) {
      const start = { x: fromRect.x + fromRect.width, y: fromCenter.y };
      const end = { x: toRect.x + toRect.width, y: toCenter.y };
      const bowX = Math.max(extent.width, start.x, end.x) + 36;
      return [start, { x: bowX, y: start.y }, { x: bowX, y: end.y }, end];
    }
    const goingDown = toCenter.y >= fromCenter.y;
    const start = { x: fromCenter.x, y: goingDown ? fromRect.y + fromRect.height : fromRect.y };
    const end = { x: toCenter.x, y: goingDown ? toRect.y : toRect.y + toRect.height };
    const midY = (start.y + end.y) / 2;
    return [start, { x: start.x, y: midY }, { x: end.x, y: midY }, end];
  }

  if (toCenter.x < fromCenter.x) {
    const start = { x: fromCenter.x, y: fromRect.y + fromRect.height };
    const end = { x: toCenter.x, y: toRect.y + toRect.height };
    const bowY = Math.max(extent.height, start.y, end.y) + 36;
    return [start, { x: start.x, y: bowY }, { x: end.x, y: bowY }, end];
  }
  const goingRight = toCenter.x >= fromCenter.x;
  const start = { x: goingRight ? fromRect.x + fromRect.width : fromRect.x, y: fromCenter.y };
  const end = { x: goingRight ? toRect.x : toRect.x + toRect.width, y: toCenter.y };
  const midX = (start.x + end.x) / 2;
  return [start, { x: midX, y: start.y }, { x: midX, y: end.y }, end];
}
