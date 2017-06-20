.. Copyright 2011-2017 Olivier Carrère
.. Cette œuvre est mise à disposition selon les termes de la licence Creative
.. Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
.. conditions 4.0 international.

.. code review: no code

.. _configurez-le-raspberry-pi:

Configurez le |raspi3|
----------------------

.. rubric:: Prérequis

- Carte micro-SD de 16 Go classe 10 (de préférence).
- Connexion Internet filaire ou Wi-Fi.

#. Installez la distribution Linux Raspbian sur votre |raspi3| *via* `NOOBS`_.

#. Sélectionnez :guilabel:`Menu` ‣ :guilabel:`Preferences` ‣ :guilabel:`Raspberry Pi Configuration`.

   La boîte de dialogue :guilabel:`Raspberry Pi Configuration` apparaît.

#. Sélectionnez l'onglet :guilabel:`Localisation`.

#. Cliquez sur :guilabel:`Set Locale`, sélectionnez les options suivantes, puis
   cliquez sur :guilabel:`OK` :

   +--------------------+--------------------+
   |Option              |Valeur              |
   +====================+====================+
   |Language            |fr (French)         |
   +--------------------+--------------------+
   |Country             |FR (France)         |
   +--------------------+--------------------+
   |Character Set       |UTF-8               |
   +--------------------+--------------------+

#. Cliquez sur :guilabel:`Set Keyboard`, sélectionnez les valeurs correspondant à
   votre clavier, puis cliquez sur :guilabel:`OK`.

#. Cliquez sur :guilabel:`OK` dans la boîte de dialogue :guilabel:`Raspberry Pi Configuration`.

#. Sélectionnez :guilabel:`Menu` ‣ :guilabel:`Accessories` ‣ :guilabel:`Terminal`.

#. Mettez à jour le système :

   .. code-block:: console

      $  sudo aptitude update && sudo aptitude safe-upgrade -y

   Le temps de lire un épisode du *Surfer d'argent*, et le système est mis à
   jour.

#. Sélectionnez :guilabel:`Menu` ‣ :guilabel:`Shutdown` ‣ :guilabel:`Reboot`.

   Le |raspi3| redémarre.

.. text review: yes
