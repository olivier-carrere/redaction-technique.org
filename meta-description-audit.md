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
| The three levels of technical documentation | `costs/three-levels-of-documentation` | à auditer | |
| Integrating documentation into development processes | `tech-writing-process/integrating-documentation-into-development` | à auditer | |
| Project definition | `tech-writing-process/project-definition` | à auditer | |
| Gathering information | `tech-writing-process/gathering-information` | à auditer | |
| Target format | `tech-writing-process/target-format` | à auditer | |

Pour chaque page « à auditer » : comparer la `description` (frontmatter EN et FR) au
contenu réel, puis corriger la méta-description si elle promet des sujets non traités.
