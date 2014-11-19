redaction-technique.org
=======================

Website powered by Python Sphinx about managing documentation as source code (in French)
- DITA XML version based on reST version 1.1

Generating a PDF deliverable
----------------------------

$ wget http://downloads.sourceforge.net/project/dita-ot/DITA-OT%20Stable%20Release/DITA%20Open%20Toolkit%201.5.4/DITA-OT1.5.4_full_easy_install_bin.tar.gz

$ tar -xzvf DITA-OT1.8.5_full_easy_install_bin.tar.gz

$ cd DITA-OT1.8.5/

$ ./startcmd.sh

$ ant -f integrator.xml

$ cd ..

$ git clone https://github.com/olivier-carrere/redaction-technique.org.git

$ cd redaction-technique.org

$ git checkout DITA_XML

$ cp plugins/org.dita.pdf2/cfg/common/vars/fr-fr.xml ../DITA-OT1.8.5/plugins/org.dita.pdf2/cfg/common/vars/fr.xml

$ java -jar ../DITA-OT1.8.5/lib/dost.jar /i:no-code-topics.ditamap /transtype:pdf /ditadir:../DITA-OT1.8.5

The output is out/no-code-topics.pdf.
