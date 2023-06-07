# Mijn Spelletjes Site

[_metadata_:title]:- "Mijn Spelletjes Site"
[_metadata_:author]:- "Martin van Diest"


## Starten docker

----
docker build -t webapps1 .

docker run -p 80:8090 -it -d --name webapps1 webapps1

docker run -p 80:8090 -it -d --name webapps1 -v ${PWD}:/app webapps1

(deze laatste moet je vanuit de directory runnen waarin je files staan.
En de ${PWD} werkt alleen met PowerShell)
----

## Beginnetje gemaakt

Ik heb een begin gemaakt met de code voor opdracht 2.
Kijk er even doorheen of je er mee kan leven. Of misschien vind je
dat iets niet goe dis, of helemaal anders moet. Laat dat vooral weten.

Ik denk dat het handig is, dat we met deze verder gaan.

En steeds de veranderingen hier naar de branch 'martin' pushen.

Laat maar weten wat je ervan vindt zover.

MARTIN

## DOCS

De JS-DOCS worden automatisch gegenereerd en zijn te zien als je naar http://localhost:80/docs navigeert in je browser.

## MVP

### Model

Je domein. Server communicatie of data. 

### (Passive) View

DOM manipulatie (via jquery) en HTML 

## presenter

Event-Handling, User Interactie