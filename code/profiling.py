#!/usr/bin/python
# coding: utf8
class Audience:
    def __init__(self,pers,seas):
        self.personae=pers
        self.season=seas
        
import jinja2
import sys
reload(sys)
sys.setdefaultencoding('utf8')

if len(sys.argv) == 3:
    pubparam=str(sys.argv[1])
    seasparam=str(sys.argv[2])
    if pubparam in ('electrician','plumber') and seasparam in ('winter','spring', 'summer', 'autumn'):
        user=Audience(pubparam,seasparam)
        env = jinja2.Environment(loader=jinja2.FileSystemLoader('./'))
        template = env.get_template('texte-conditionnel.rst')
        string=template.render(public=user)
        print(string)
    else:
	print('Valeurs admises :\nelectrician ou plumber en 1er paramètre\nwinter,spring, summer, autumn en 2nd paramètre')
else:
    print('Veuillez indiquer le public et la saison')
