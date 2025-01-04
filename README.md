# Progetto user management - Frontend Angular & Backend Laravel

Questo progetto consente di gestire una lista di utenti tramite un backend Laravel e un frontend Angular. L'applicazione richiede l'installazione manuale degli ambienti di sviluppo.

---

## Requisiti

Per eseguire l'applicazione, è necessario installare i seguenti software:

1. **Backend (Laravel)**
   - [PHP (versione 8.1 o superiore)](https://www.php.net/downloads)
   - [Composer](https://getcomposer.org/download/)
   - [MySQL](https://dev.mysql.com/downloads/) (incluso in XAMPP)
   - [XAMPP](https://www.apachefriends.org/it/index.html) (opzionale, fornisce Apache e MySQL)

2. **Frontend (Angular)**
   - [Node.js (versione 18 o superiore)](https://nodejs.org/)
   - [Angular CLI](https://angular.io/cli)

3. **Git**
   - [Git](https://git-scm.com/)

---

## Clonazione del Repository

1. Clona il repository sul tuo computer:

   ```bash
   git clone <URL_DEL_REPOSITORY>
   cd <NOME_CARTELLA_REPOSITORY>

## Configurazioni

 **Backend (Laravel)**
1. Avvia Apache e MySQL dal pannell controllo XAMPP
2. Configura Database, Accedi a phpMyAdmin: http://localhost/phpmyadmin. Crea un nuovo database chiamato crud_utenti.
3. Installa dipendenze Laravel comando: composer install
4. Configura file env per la connessione al db se nome diverso
5. Genera le chiavi dell'applicazione comando: php artisan key:generate
6. Esegui migrazione database comando: php artisan migrate 
7. Avvia server  comando: php artisan serve 

**Frontend (Angular)**
1. Scarica ed installa Node.js
2. Installa angular CLI comando:npm install -g @angular/cli
3. Installa le dipendenze accedi alla directory frontend ed esegui comando: npm install
4. Se neccessario configura url del backend nel file src/environments/environment.ts
5. Avvia server comando:ng serve


**Test**
1. Avvia server backend
2. Avvia server frontend
3. AprApri il browser e accedi all'indirizzo http://localhost:4200.
4. Verifica che sia possibile:Visualizzare la lista degli utenti, aggiungere, visualizzare, modificare e cancellare un utente.