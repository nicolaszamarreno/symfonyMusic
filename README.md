#Symphonie Music

Composition du Groupe 
- Lisa
- Marie
- Vincent
- Philippe 
- Yann 
- Nicolas

##Commandes pour bien débuter  
Une fois le repository téléchargé, il faut lancer composer afin d'installer toutes les dépendances  
`$ composer install`

Ne pas oublier de changer l'accès à la base de données qui se trouve dans **app/config/paramaters.yml** et d'installer les entités grâce à la commande   
`$ php bin/console doctrine:schema:update --dump-sql`  
`$ php bin/console doctrine:schema:update --force`

##Commandes pour le développement  
Pour faciliter le développement Front-End, on peut lancer un Livereload afin d'optimiser le temps lors de notre intégration.     
`$ npm install`

Pour lancer la task Gulp pour l'intégration :  
`$ gulp production`
