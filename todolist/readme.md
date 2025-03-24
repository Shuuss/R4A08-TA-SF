https://gitlab.com/formations-kgaut/but-info/r4.a08/r4.a08-support-de-cours/-/blob/main/le-gros-sujet.md?ref_type=heads

Tanguy Abdoulvaid et Simon Fétré

Notre solution utilise une base de donnée en postgresql et une application client-serveur en nodejs donc nous avons créé 3 containers

notre application permet de :
- voir les tâches
- marquer une tâche comme complétée
- marquer une tâche comme non complétée
- ajouter une tâche
- supprimer une tâche

Afin de déployer notre solution il vous faudra libérer les ports 6969(front), 3001(back) et 5435(database).
Vous devrez ensuite éxécuter la ligne de commande :

docker-compose up --build

puis vous pourrez trouver notre solution ici : http://localhost:6969