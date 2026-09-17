// Shared helper: spins up a real `astro dev` server on an ephemeral port and
// waits for it to answer HTTP requests.
//
// Why this exists: `astro dev` evaluates every route per request regardless
// of its `prerender` export, which is exactly what we need to make real HTTP
// requests (including query strings) against on-demand-rendered routes like
// the index.json endpoints. It does NOT, by itself, prove a route is
// on-demand rather than statically prerendered in production — that's what
// the build-output check in tests/api-index-endpoint.test.mjs is for. This
// helper is for exercising request-time behavior (filtering, validation),
// not for verifying build-time output shape.
//
// Astro 7's dev CLI auto-detects certain agent/CI environments and
// daemonizes itself: the launcher process we spawn exits 0 immediately
// after handing off to a detached background server. That's expected, not a
// failure — readiness is determined purely by polling the HTTP endpoint.
// Stopping such a server requires `astro dev stop` (killing the launcher
// process, which has already exited, does nothing).
import { spawn, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import net from 'node:net';

const execFileAsync = promisify(execFile);
const npxBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';

async function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

/**
 * Starts `astro dev` on a free local port and waits until it serves
 * /schema.json successfully.
 *
 * @param {{ timeoutMs?: number }} [opts]
 * @returns {Promise<{ baseUrl: string, stop: () => Promise<void> }>}
 */
export async function startAstroDevServer({ timeoutMs = 45000 } = {}) {
  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;

  const proc = spawn(npxBin, ['astro', 'dev', '--port', String(port), '--host', '127.0.0.1'], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env },
  });

  let stderrBuf = '';
  proc.stderr?.on('data', (chunk) => {
    stderrBuf += chunk.toString();
  });
  let launcherExitCode = null;
  proc.on('exit', (code) => {
    launcherExitCode = code;
  });

  const stop = async () => {
    try {
      await execFileAsync(npxBin, ['astro', 'dev', 'stop'], { cwd: process.cwd() });
    } catch {
      // Best-effort: if the launcher never detached (ran in foreground),
      // there's no background daemon to stop — kill the process directly.
      if (proc.exitCode === null) proc.kill('SIGTERM');
    }
  };

  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    // A non-zero exit from the launcher means it failed outright (not the
    // "handed off to a background daemon" case, which exits 0).
    if (launcherExitCode !== null && launcherExitCode !== 0) {
      throw new Error(`astro dev exited with code ${launcherExitCode} before becoming ready.\n${stderrBuf}`);
    }
    try {
      const res = await fetch(`${baseUrl}/schema.json`);
      if (res.ok) {
        return { baseUrl, stop };
      }
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  await stop();
  throw new Error(
    `astro dev server did not become ready on ${baseUrl} within ${timeoutMs}ms: ${lastError}\n${stderrBuf}`
  );
}
