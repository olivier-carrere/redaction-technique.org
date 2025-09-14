---
title: "Les sources de ce blog sont gérées sous Git"
description: "Ce blog, initialement sous WordPress, a migré vers reStructuredText pour permettre des modifications transverses et un suivi précis du cycle de vie du contenu."
slug: les-sources-de-ce-blog-sont-gerees-sous-git
---

Ce blog a été initialement développé sous WordPress. L'impossibilité d'effectuer sous ce `CMS (Content Management System)`{.interpreted-text role="abbr"} des modifications transverses ou d'avoir un suivi précis du cycle de vie du contenu a entraîné une migration vers le format de balisage léger **reStructuredText**.

![](/assets/documentation-life-cycle-framework.svg)

Toutes les versions de ce blog sont gérées sous le logiciel de gestion de versions décentralisé [Git](). Les modifications de contenu, de structure ou de mise en page peuvent désormais être :

- regroupées par lots cohérents,
- liées à un ticket de logiciel de suivi de problèmes tel que *Bugzilla* ou *Trac*,
- validées par des pairs,
- partagées entre différentes versions du projet de documentation,
- annulées en une seule opération, etc.