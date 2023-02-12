# Mijn Spelletjes Site

[_metadata_:title]:- "Mijn Spelletjes Site"
[_metadata_:author]:- "Martin van Diest"


## Starten docker

----
docker build -t webapps1 .

docker run -p 80:8090 -it -d --name webapps1 webapps1
----