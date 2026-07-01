# Audit des méta-descriptions surpromises

Suivi des pages dont la méta-description (`description` en frontmatter) promet des
sujets ou termes qui ne sont pas réellement traités dans le corps de la page. La
méta-description doit refléter le contenu effectif : mentionner un format, un outil ou
un concept absent de la page nuit à la pertinence et à la confiance des lecteurs venus
des moteurs de recherche.

Statuts : **à auditer** (à vérifier), **corrigé** (méta-description alignée sur le
contenu), **OK** (vérifié, aucune surpromesse).

| Page | Slug | Statut | Note |
|------|------|--------|------|
| Formats and tools | `costs/formats-and-tools` | corrigé | La méta-description citait Markdown et reStructuredText, jamais évoqués dans la page ; réécrite autour de Word, FrameMaker, DITA XML et DocBook (EN + FR). |
| The three levels of technical documentation | `costs/three-levels-of-documentation` | OK | Description « from informal notes to modular structured content » : fidèle au corps (friche → contenu structuré DITA). Aucune surpromesse. |
| Integrating documentation into development processes | `tech-writing-process/integrating-documentation-into-development` | OK | DocBook, DITA XML et reStructuredText cités en méta-description : tous trois présents dans le corps. Aucune surpromesse. |
| Project definition | `tech-writing-process/project-definition` | OK | « audience, scope, deliverables, success criteria » : correspond au tableau du corps. Aucune surpromesse. |
| Gathering information | `tech-writing-process/gathering-information` | OK | « expert interviews, product testing, existing documentation, field observations » : correspond à la liste du corps. Aucune surpromesse. |
| Target format | `tech-writing-process/target-format` | OK | « PDF, HTML, compiled help… fully/semi-automatic, manual » : correspond au tableau du corps. Aucune surpromesse. |

Pour chaque page « à auditer » : comparer la `description` (frontmatter EN et FR) au
contenu réel, puis corriger la méta-description si elle promet des sujets non traités.
