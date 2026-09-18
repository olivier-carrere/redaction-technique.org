// Accessible name and long description of every native SVG diagram, per
// locale. Single source for both the rendered figure (DiagramFrame
// aria-label + screen-reader description) and the text alternative that
// getPageMarkdown() emits in the Markdown API and llms-full.txt, where the
// SVG itself cannot be carried. Keys are the diagram component names used
// as MDX tags.
export type DiagramText = { title: string; description?: string };

export const DIAGRAM_TEXT: Record<string, Record<"en" | "fr", DiagramText>> = {
  ApiRetrievalPipelineDiagram: {
    en: {
      title: "API Retrieval Pipeline",
      description:
        "Sequential four-stage retrieval pipeline: discover contract, query index, select document, and retrieve Markdown.",
    },
    fr: {
      title: "Pipeline de récupération de l'API",
      description:
        "Pipeline de récupération séquentiel en quatre étapes : découverte du contrat, interrogation de l'index, sélection du document et récupération du Markdown.",
    },
  },
  CentralizedConrefManagementDiagram: {
    en: {
      title: "Good conref management",
      description:
        "Diagram showing shared.dita as the conref source, referenced by dita-1.dita and dita-2.dita as conref targets.",
    },
    fr: {
      title: "Bonne gestion des conref",
      description:
        "Schéma montrant shared.dita comme source du conref, référencé par dita-1.dita et dita-2.dita comme cibles du conref.",
    },
  },
  ComplexVsComplicatedDiagram: {
    en: {
      title: "DITA XML is complex but predictable, traditional formats are complicated and erratic",
      description:
        "Cynefin framework diagram placing DITA XML in the complex domain, since its behavior is rational and predictable despite its complexity, and traditional formats like FrameMaker in the complicated domain, due to their erratic behavior requiring workarounds and hacks.",
    },
    fr: {
      title: "DITA XML est complexe mais prévisible, les formats traditionnels sont compliqués et erratiques",
      description:
        "Diagramme du cadre Cynefin plaçant DITA XML dans le domaine complexe, car son comportement est rationnel et prévisible malgré sa complexité, et les formats traditionnels comme FrameMaker dans le domaine compliqué, en raison de leur comportement erratique nécessitant contournements et astuces.",
    },
  },
  ConcurrentEditsSequenceDiagram: {
    en: {
      title: "Concurrent edits to a file on a shared network drive",
      description:
        "Sequence diagram showing Alice and Bob opening the same version of a file, each editing their own copy, then saving one after the other: Alice's changes, saved first, are overwritten by Bob's.",
    },
    fr: {
      title: "Modification concurrente d'un fichier sur un dossier réseau partagé",
      description:
        "Diagramme de séquence montrant Arsène et Louise ouvrant la même version d'un fichier, le modifiant chacun de leur côté, puis l'enregistrant l'un après l'autre : les modifications d'Arsène, enregistrées en premier, sont écrasées par celles de Louise.",
    },
  },
  ConfidentialInfoDitavalDiagram: {
    en: {
      title: "Hiding confidential information from translators",
      description:
        "Diagram showing a confidential source in language A split by translation into two branches, each filtered through ditaval, producing a language A deliverable that keeps the confidential information and a language B deliverable that excludes it.",
    },
    fr: {
      title: "Masquer des informations confidentielles aux traducteurs",
      description:
        "Schéma montrant une source confidentielle en langue A divisée par la traduction en deux branches, chacune filtrée par ditaval, produisant un livrable langue A conservant les informations confidentielles et un livrable langue B les excluant.",
    },
  },
  ConrefSharedSourceDiagram: {
    en: {
      title: "Sharing fine-grained information blocks with conref",
      description:
        "Diagram showing shared.dita as the conref source, referenced by dita-1.dita and dita-2.dita as conref targets.",
    },
    fr: {
      title: "Partage de blocs d'information fins avec les conref",
      description:
        "Schéma montrant shared.dita comme source du conref, référencé par dita-1.dita et dita-2.dita comme cibles du conref.",
    },
  },
  DecentralizedConrefDiagram: {
    en: {
      title: "Decentralized conref management",
      description:
        "Diagram showing three DITA files referencing each other in a circular pattern, with no central source file.",
    },
    fr: {
      title: "Gestion décentralisée des conref",
      description:
        "Schéma montrant trois fichiers DITA se référençant les uns les autres en cercle, sans fichier source central.",
    },
  },
  DevPipelineIntegrationDiagram: {
    en: {
      title: "Integrating modular documentation into the development pipeline",
      description:
        "Flowchart showing modular documentation sources fed by bug tracking, connected to version control, and profiled into PDF, HTML, JavaHelp, and ePUB outputs.",
    },
    fr: {
      title: "Intégration de la documentation modulaire dans le pipeline de développement",
      description:
        "Schéma montrant les sources de documentation modulaires alimentées par la gestion de bugs, reliées à la gestion des versions, et profilées vers les formats PDF, HTML, JavaHelp et ePUB.",
    },
  },
  DeveloperInformationTypesJourneyDiagram: {
    en: {
      title: "Developer Journey Across Information Types",
      description:
        "Sequential progression across documentation types, from domain concepts to task execution and reference lookup.",
    },
    fr: {
      title: "Parcours du développeur à travers les types d'information",
      description:
        "Progression séquentielle à travers les trois types d'information, de la compréhension des concepts à la réalisation d'une tâche puis à la consultation des spécifications.",
    },
  },
  DitaToDocbookToPdfChainDiagram: {
    en: {
      title: "DITA XML to DocBook to PDF is a non-reversible process",
      description:
        "Diagram showing a one-way chain from DITA XML to DocBook to PDF, each step semantically poorer than the last and not recoverable by reversing the process.",
    },
    fr: {
      title: "DITA XML vers DocBook vers PDF, un processus non réversible",
      description:
        "Schéma montrant une chaîne à sens unique de DITA XML vers DocBook vers PDF, chaque étape sémantiquement plus pauvre que la précédente et non récupérable en inversant le processus.",
    },
  },
  DitamapTreeDiagram: {
    en: {
      title: "A ditamap organizes topics into a tree",
      description:
        "Tree structure of the user guide ditamap, a concept topic for the product overview, an Installation group containing a prerequisites concept and an installation task, and a troubleshooting topic.",
    },
    fr: {
      title: "Une ditamap organise les topics en arborescence",
      description:
        "Arborescence de la ditamap du guide de l'utilisateur : un topic concept de présentation, un sous-groupe Installation contenant un concept de prérequis et une tâche d'installation, puis un topic de dépannage.",
    },
  },
  DitavalConditionalTextDiagram: {
    en: {
      title: "Conditional text filtering with ditaval",
      description:
        "Diagram showing a source filtered by ditaval into two distinct targets, each receiving only the content selected for it.",
    },
    fr: {
      title: "Texte conditionnel avec ditaval",
      description:
        "Schéma montrant une source filtrée par ditaval vers deux cibles distinctes, chacune ne recevant que le contenu qui lui est destiné.",
    },
  },
  DocWritingKanbanBoard: {
    en: {
      title: "Documentation writing and validation flow",
    },
    fr: {
      title: "Flux de rédaction et de validation documentaire",
    },
  },
  DocsAsCodeWorkflowDiagram: {
    en: {
      title: "Basic Docs-as-Code Workflow",
      description:
        "Sequential progression of a documentation change from branch creation to production deployment.",
    },
    fr: {
      title: "Workflow docs-as-code basique",
      description:
        "Progression étape par étape d’un changement documentaire, de la création de branche au déploiement en production.",
    },
  },
  FormatStructuringDiagram: {
    en: {
      title: "Technical documentation formats by degree of structuring",
      description:
        "Diagram ranking reStructuredText, FrameMaker, DocBook, and DITA XML by increasing degree of structuring.",
    },
    fr: {
      title: "Formats de documentation technique selon le degré de structuration",
      description:
        "Schéma classant reStructuredText, FrameMaker, DocBook et DITA XML par degré de structuration croissant.",
    },
  },
  FrameMakerConversionTableDiagram: {
    en: {
      title: "Application of a conversion table from FrameMaker to DITA XML",
      description:
        "Diagram showing FrameMaker content converted to DITA XML by applying a conversion table.",
    },
    fr: {
      title: "Application d'une table de conversion de FrameMaker vers DITA XML",
      description:
        "Schéma montrant le contenu FrameMaker converti en DITA XML par l'application d'une table de conversion.",
    },
  },
  FrameMakerMigrationGanttDiagram: {
    en: {
      title: "Migration from FrameMaker to DITA XML",
      description:
        "Diagram showing the migration to DITA XML and the implementation of the DITA XML workflow running as two parallel activities.",
    },
    fr: {
      title: "Migration de FrameMaker vers DITA XML",
      description:
        "Schéma montrant la migration vers DITA XML et la mise en place de la chaîne DITA XML comme deux activités menées en parallèle.",
    },
  },
  FrameMakerRestructuringGanttDiagram: {
    en: {
      title: "FrameMaker content restructuring and DITA XML chain implementation",
      description:
        "Diagram showing FrameMaker content restructuring running alongside implementing the DITA XML chain, as two parallel activities.",
    },
    fr: {
      title: "Restructuration du contenu FrameMaker et mise en place de la chaîne DITA XML",
      description:
        "Schéma montrant la restructuration du contenu FrameMaker menée en parallèle de la mise en place de la chaîne DITA XML.",
    },
  },
  GatheringInformationMindmap: {
    en: {
      title: "Gathering information",
    },
    fr: {
      title: "Collecte de l'information",
    },
  },
  GroupedCommitHistoryDiagram: {
    en: {
      title: "Grouped commit history after rebase",
      description:
        "Git history showing two commits after rebase, one grouping all text correction changes and one grouping all synopsis changes.",
    },
    fr: {
      title: "Historique de commits regroupés après le rebase",
      description:
        "Historique Git montrant deux commits après rebase, l'un regroupant toutes les corrections de texte et l'autre tous les changements de synopsis.",
    },
  },
  HighLevelConrefNodeDiagram: {
    en: {
      title: "Conref on the highest-level XML node",
      description:
        "Diagram showing a conref placed on a high-level step node, referencing another step node and replacing all of its content.",
    },
    fr: {
      title: "Conref sur le nœud XML de plus haut niveau",
      description:
        "Schéma montrant un conref placé sur un nœud step de haut niveau, référençant un autre nœud step et remplaçant tout son contenu.",
    },
  },
  IncrementalBackupArchitectureDiagram: {
    en: {
      title: "Incremental and decentralized backup",
    },
    fr: {
      title: "Sauvegarde incrémentale et décentralisée",
    },
  },
  InterleavedCommitHistoryDiagram: {
    en: {
      title: "Interleaved commit history before rebase",
      description:
        "Git history showing five commits alternating between text correction and synopsis changes, before reorganizing them with rebase.",
    },
    fr: {
      title: "Historique de commits entrelacés avant le rebase",
      description:
        "Historique Git montrant cinq commits alternant entre corrections de texte et modifications de synopsis, avant leur réorganisation par rebase.",
    },
  },
  LowLevelConrefNodeDiagram: {
    en: {
      title: "Conref on the lowest-level XML node",
      description:
        "Diagram showing a conref placed on a low-level cmd node, referencing another cmd node.",
    },
    fr: {
      title: "Conref sur le nœud XML de plus bas niveau",
      description:
        "Schéma montrant un conref placé sur un nœud cmd de bas niveau, référençant un autre nœud cmd.",
    },
  },
  MarketingTechnicalMediaQuadrantChart: {
    en: {
      title: "Marketing and technical writing media by technical level and marketing value",
      description:
        "Quadrant chart plotting six communication media by technical level and marketing value. Animation is low-technical and high-marketing. User guide is high-technical and low-marketing. White paper is high on both axes. Corporate magazine is low on both. Brochure and website sit near the middle.",
    },
    fr: {
      title: "Supports marketing et rédaction technique selon niveau technique et valeur marketing",
      description:
        "Diagramme en quadrants positionnant six supports de communication selon leur niveau technique et leur valeur marketing. L'animation est peu technique et à forte valeur marketing. Le guide de l'utilisateur est très technique et à faible valeur marketing. Le livre blanc est élevé sur les deux axes. Le magazine d'entreprise est faible sur les deux. La plaquette et le site web se situent au milieu.",
    },
  },
  ModularConrefBlocksDiagram: {
    en: {
      title: "Conrefs modularize small information blocks",
    },
    fr: {
      title: "Les conref modularisent de petits blocs d'information",
    },
  },
  ModularFileClustersDiagram: {
    en: {
      title: "Modular technical writing source format",
      description:
        "Diagram showing modular file clusters reused across two documents, Document A and Document B, sharing content instead of duplicating it.",
    },
    fr: {
      title: "Format source de rédaction technique modulaire",
      description:
        "Schéma montrant des grappes de fichiers modulaires réutilisées entre deux documents, Document A et Document B, qui partagent du contenu au lieu de le dupliquer.",
    },
  },
  MonolithicFilesDiagram: {
    en: {
      title: "Monolithic technical writing source format",
      description:
        "Diagram showing two self-contained monolithic documents with no shared content between them.",
    },
    fr: {
      title: "Format source de rédaction technique monolithique",
      description:
        "Schéma montrant deux documents monolithiques autonomes, sans contenu partagé entre eux.",
    },
  },
  MonolithicVsModularDiagram: {
    en: {
      title: "Modular documentation offers unparalleled flexibility",
      description:
        "Diagram contrasting monolithic documentation, a single undivided block, with modular documentation, assembled on demand from multiple blocks.",
    },
    fr: {
      title: "Une documentation modulaire offre une souplesse inégalée",
      description:
        "Schéma opposant la documentation monolithique, un bloc unique et indivisible, à la documentation modulaire, assemblée à la demande à partir de plusieurs blocs.",
    },
  },
  NestedConrefChainDiagram: {
    en: {
      title: "Multi-level conref nesting is risky",
      description:
        "Diagram showing three levels of conref nesting, one conref pointing to a conref pointing to another conref.",
    },
    fr: {
      title: "Imbriquer les conref sur plusieurs niveaux est risqué",
      description:
        "Schéma montrant trois niveaux d'imbrication de conref, un conref pointant vers un conref pointant vers un autre conref.",
    },
  },
  PhotoWorkflowDiagram: {
    en: {
      title: "Photo gallery workflow diagram",
      description:
        "Diagram showing photographers uploading and iconographers selecting, classifying, and indexing photos into Piwigo, which feeds a Git repository backed up locally and cloned by non-profit members, and lets graphic designers search and download photos.",
    },
    fr: {
      title: "Schéma du flux de travail de la galerie photo",
      description:
        "Schéma montrant les photographes téléversant et les iconographes sélectionnant, classant et indexant les photos dans Piwigo, qui alimente un dépôt Git sauvegardé localement et cloné par les membres de l'association, et permettant aux graphistes de rechercher et télécharger des photos.",
    },
  },
  PhotoWorkflowRolesSwimlaneDiagram: {
    en: {
      title: "Piwigo photo management workflow by role",
      description:
        "Three lanes for the photographer, the iconographer, and the graphic designer. The photographer shoots, edits, and uploads the photo; the iconographer selects, classifies, and adds keywords; the graphic designer views, downloads, and publishes the photos.",
    },
    fr: {
      title: "Flux de gestion des photos Piwigo par rôle",
      description:
        "Trois couloirs représentant le photographe, l'iconographe et le graphiste. Le photographe prend la photo, la retouche et la téléverse ; l'iconographe sélectionne, classe et ajoute des mots-clés ; le graphiste consulte, télécharge et publie les photos.",
    },
  },
  RawToJpegChainDiagram: {
    en: {
      title: "RAW to TIFF to JPEG is a non-reversible process",
      description:
        "Diagram showing a one-way chain from RAW to TIFF to JPEG, each step losing information that cannot be recovered by reversing the process.",
    },
    fr: {
      title: "RAW vers TIFF vers JPEG, un processus non réversible",
      description:
        "Schéma montrant une chaîne à sens unique de RAW vers TIFF vers JPEG, chaque étape perdant des informations qui ne peuvent pas être récupérées en inversant le processus.",
    },
  },
  SerialVsParallelTranslationGantt: {
    en: {
      title: "Serial versus parallel writing and translation",
      description:
        "Gantt chart comparing a serial process, where translation only starts after the source document is fully validated and delivered, with a parallel process, where translation of modular content starts as soon as it is written, reducing total time to market.",
    },
    fr: {
      title: "Rédaction et traduction en mode sériel ou parallèle",
      description:
        "Diagramme de Gantt comparant un processus sériel, où la traduction ne démarre qu'une fois le document source entièrement validé et livré, et un processus parallèle, où la traduction du contenu modulaire démarre dès sa rédaction, réduisant le délai de mise sur le marché.",
    },
  },
  SerialVsParallelValidationGantt: {
    en: {
      title: "Serial or parallel validation of the writing phase",
      description:
        "Gantt chart comparing a serial process, where validation only starts once writing is complete, and a parallel process, where validation starts as soon as the first modules are written, shortening the publication timeline.",
    },
    fr: {
      title: "Validation en série ou en parallèle de la rédaction",
      description:
        "Diagramme de Gantt comparant un processus sériel, où la validation ne démarre qu'une fois la rédaction terminée, et un processus parallèle, où la validation démarre dès les premiers modules rédigés, réduisant le délai de publication.",
    },
  },
  SharedDitamapBlocksDiagram: {
    en: {
      title: "Sharing information blocks between ditamaps",
      description:
        "Diagram showing ditamap A referencing 1.dita and 2.dita, and ditamap B referencing 2.dita and 3.dita, with 2.dita shared between both maps.",
    },
    fr: {
      title: "Partage de blocs d'information entre ditamap",
      description:
        "Schéma montrant le ditamap A référençant 1.dita et 2.dita, et le ditamap B référençant 2.dita et 3.dita, avec 2.dita partagé entre les deux ditamaps.",
    },
  },
  SingleRepositoryDiagram: {
    en: {
      title: "Single repository feeding multiple deliverables",
      description:
        "Diagram showing a single documentation repository feeding six deliverable formats: brochure, website, corporate magazine, white paper, user guide, and animation.",
    },
    fr: {
      title: "Un référentiel unique alimentant plusieurs livrables",
      description:
        "Schéma montrant un référentiel documentaire unique alimentant six formats de livrables : brochure, site web, magazine d'entreprise, livre blanc, guide utilisateur et animation.",
    },
  },
  SingleSourceMultipleTargetsDiagram: {
    en: {
      title: "One set of information, multiple output formats",
      description:
        "Diagram showing DITA XML as a hub feeding five output formats, PDF, website, Word processor, JavaHelp, and Windows help.",
    },
    fr: {
      title: "Un seul jeu d'informations, une multiplicité de formats de sortie",
      description:
        "Schéma montrant DITA XML comme point central alimentant cinq formats de sortie, PDF, site web, traitement de texte, JavaHelp et aide Windows.",
    },
  },
  SourceFormatRadarChart: {
    en: {
      title: "Source formats: modularity, format and structuring",
      description:
        "Radar chart comparing FrameMaker, DocBook, and DITA XML across three axes: modularity, text format, and semantic structuring. FrameMaker is low on modularity, binary, and unstructured. DocBook is low on modularity but text-based and structured. DITA XML is highly modular, text-based, and structured.",
    },
    fr: {
      title: "Formats source : modularité, format et structuration",
      description:
        "Diagramme radar comparant FrameMaker, DocBook et DITA XML selon trois axes : modularité, format texte et structuration sémantique. FrameMaker est faible en modularité, binaire et non structuré. DocBook est faible en modularité mais textuel et structuré. DITA XML est très modulaire, textuel et structuré.",
    },
  },
  SourceFormatsQuadrantChart: {
    en: {
      title: "Feature and complexity levels of text formats",
      description:
        "Quadrant chart plotting reStructuredText, DocBook, and DITA XML by complexity and features. reStructuredText is low on both axes. DocBook is more complex but still limited in features. DITA XML is both complex and feature-rich.",
    },
    fr: {
      title: "Fonctionnalités et complexité des formats texte",
      description:
        "Diagramme en quadrants positionnant reStructuredText, DocBook et DITA XML selon leur complexité et leurs fonctionnalités. reStructuredText est faible sur les deux axes. DocBook est plus complexe mais reste limité en fonctionnalités. DITA XML est à la fois complexe et riche en fonctionnalités.",
    },
  },
  SourcesToDeliverableDiagram: {
    en: {
      title: "Documentation sources must be less voluminous than deliverables",
      description:
        "Diagram showing compact, non-redundant sources producing a PDF deliverable.",
    },
    fr: {
      title: "Les sources de la documentation doivent être moins volumineuses que les livrables",
      description:
        "Schéma montrant des sources compactes et non redondantes produisant un livrable PDF.",
    },
  },
  StandardFormatToolChoiceDiagram: {
    en: {
      title: "A standard format leaves the choice of tool open",
      description:
        "Diagram showing four different tool types, a text editor, open-source software, a graphical tool, and proprietary software, all able to edit the same standard DITA XML format.",
    },
    fr: {
      title: "Un format standard laisse le choix de l'outil",
      description:
        "Schéma montrant quatre types d'outils, un éditeur de texte, un logiciel open-source, un outil graphique et un logiciel propriétaire, capables de modifier le même format standard DITA XML.",
    },
  },
  StructuredVsUnstructuredDiagram: {
    en: {
      title: "Structured versus unstructured content organization",
      description:
        "Diagram comparing unstructured sections, which remain undifferentiated blocks, with structured sections, each broken down into concept, task, and reference information types.",
    },
    fr: {
      title: "Organisation du contenu structurée ou non structurée",
      description:
        "Schéma comparant des sections non structurées, qui restent des blocs indifférenciés, à des sections structurées, chacune décomposée en types d'information concept, task et reference.",
    },
  },
  TechWritingProcessOverviewDiagram: {
    en: {
      title: "Technical writing process",
      description:
        "Diagram showing the methodology track, project definition, information gathering, content development, validation with translation branching off it, and delivery, connected to the production line track, source format, repository, and target format, with content development feeding source format and target format feeding delivery.",
    },
    fr: {
      title: "Processus de rédaction technique",
      description:
        "Schéma montrant la piste méthodologie, définition du projet, collecte de l'information, création du contenu, validation d'où part la traduction, et livraison, reliée à la piste chaîne de production, format source, référentiel et format cible, la création du contenu alimentant le format source et le format cible alimentant la livraison.",
    },
  },
  ThreeMaturityLevelsTimeline: {
    en: {
      title: "The three maturity levels of technical documentation",
    },
    fr: {
      title: "Les trois niveaux de maturité de la documentation technique",
    },
  },
  TranslationSegmentOrderDiagram: {
    en: {
      title: "Sentence structure varies by language",
      description:
        "Diagram showing the same conref segments assembled in a different order for two languages, illustrating why segment-level conref does not translate cleanly.",
    },
    fr: {
      title: "Les phrases se découpent différemment selon les langues",
      description:
        "Schéma montrant les mêmes segments conref assemblés dans un ordre différent pour deux langues, illustrant pourquoi le conref au niveau du segment ne se traduit pas proprement.",
    },
  },
  TrunkVersionHistoryDiagram: {
    en: {
      title: "Version history on the trunk",
      description:
        "Git-style graph of the trunk showing a sequence of commits, with two of them tagged as published versions.",
    },
    fr: {
      title: "Historique des versions sur le tronc",
      description:
        "Graphe de type Git représentant le tronc sous forme d'une suite de commits, dont deux sont marqués par un tag correspondant à une version publiée.",
    },
  },
  TwoPassReviewWorkflowDiagram: {
    en: {
      title: "Two-Pass Documentation Review Workflow",
      description:
        "Structured progression showing separated technical and editorial review passes before publication.",
    },
    fr: {
      title: "Workflow de revue documentaire en deux passes",
      description:
        "Progression structurée montrant la séparation entre passe technique et passe éditoriale avant publication.",
    },
  },
  UnderstandingProductDiagram: {
    en: {
      title: "Understanding a product",
      description:
        "Flowchart showing two paths for understanding a product - gathering stakeholder perspectives and investigating independently - and comparing them to create useful documentation.",
    },
    fr: {
      title: "Comprendre un produit",
      description:
        "Schéma montrant deux voies pour comprendre un produit - recueillir les avis des parties prenantes et enquêter de manière indépendante - puis les confronter pour créer une documentation utile.",
    },
  },
  UnreliableProcessCausesDiagram: {
    en: {
      title: "Root causes of an unreliable documentation process",
    },
    fr: {
      title: "Causes racines d’un processus documentaire peu fiable",
    },
  },
};
