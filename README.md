

## Configurations

**Backend (Laravel)**
1. Démarrez Apache et MySQL depuis le panneau de contrôle XAMPP.
2. Configurez la base de données : accédez à phpMyAdmin via http://localhost/phpmyadmin. Créez une nouvelle base de données nommée `crud_utenti`.
3. Installez les dépendances Laravel avec la commande : `composer install`.
4. Configurez le fichier `.env` pour la connexion à la base de données si le nom est différent.
5. Générez les clés de l'application avec la commande : `php artisan key:generate`.
6. Exécutez les migrations de la base de données avec la commande : `php artisan migrate`.
7. Démarrez le serveur avec la commande : `php artisan serve`.

**Frontend (Angular)**
1. Téléchargez et installez Node.js.
2. Installez Angular CLI avec la commande : `npm install -g @angular/cli`.
3. Installez les dépendances : accédez au répertoire frontend et exécutez la commande : `npm install`.
4. Si nécessaire, configurez l'URL du backend dans le fichier `src/environments/environment.ts`.
5. Démarrez le serveur avec la commande : `ng serve`.

**Test**
1. Démarrez le serveur backend.
2. Démarrez le serveur frontend.
3. Ouvrez le navigateur et accédez à l'adresse http://localhost:4200.
4. Vérifiez qu'il est possible de : visualiser la liste des utilisateurs, ajouter, consulter, modifier et supprimer un utilisateur.
