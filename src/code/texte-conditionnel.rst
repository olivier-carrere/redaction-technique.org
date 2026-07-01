Utilisation du texte conditionnel
=================================

{% if public.personae == "electrician" %}

.. admonition:: Danger pour les électriciens

   Risque d'électrocution

   Ne touchez pas les fils électriques.

{% elif public.personae == "plumber" and public.season == "winter" %}

.. admonition:: Danger pour les plombiers

   Risque de fracture

   Ne plongez pas dans la piscine gelée.

{% elif public.personae == "plumber" and public.season == "summer" %}

.. admonition:: Danger pour les plombiers

   Risque d'hydrocution

   Ne plongez pas dans l'eau froide lorsqu'il fait chaud.

{% elif public.personae == "plumber" and public.season == "spring" or public.season == "autumn" %}

.. admonition:: Danger pour les plombiers

   Risque de quelque chose

   Ne plongez pas dans la piscine, on ne sait jamais.

{% else %}

.. admonition:: Aucun danger

   Si vous n'êtes ni plombier, ni électricien, vous ne courez
   aucun danger.

{% endif %}
