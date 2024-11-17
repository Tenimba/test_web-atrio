# Projet API Gestion des Personnes et Emplois

## Description
Cette API permet de gérer des informations sur des **Personnes** et leurs **Emplois**. Elle permet de :
* Créer des personnes avec des informations de base (nom, prénom, date de naissance)
* Ajouter des emplois à ces personnes, en gérant les dates de début et de fin d'emploi
* Effectuer des recherches sur les personnes et leurs emplois

L'application dispose également d'une **interface front-end** pour interagir avec l'API et d'une **documentation Swagger** pour tester les routes API.

## Fonctionnalités

### 1. Gestion des Personnes
* Créer une nouvelle personne avec les champs `firstName`, `lastName`, et `birthDate`
* L'application valide l'âge de la personne : seules les personnes de moins de 150 ans peuvent être enregistrées

### 2. Gestion des Emplois
* Ajouter un emploi pour une personne avec `companyName`, `position`, `startDate`, et `endDate`
   * La date de fin est facultative pour le poste actuellement occupé
   * Une personne peut avoir plusieurs emplois avec des dates qui se chevauchent

### 3. Interface Front-End
* Sauvegarder une nouvelle personne avec validation de l'âge (<150 ans)
* Ajouter des emplois à une personne via un formulaire
* Afficher toutes les personnes par ordre alphabétique avec leur âge et emplois actuels
* Afficher toutes les personnes ayant travaillé dans une entreprise donnée
* Afficher tous les emplois d'une personne entre deux dates spécifiques

### 4. Recherche et Filtres
* Recherche des emplois d'une personne entre deux dates données
* Liste des personnes ayant travaillé pour une entreprise spécifique

### 5. Documentation API
* Documentation Swagger interactive pour tester les routes API

## Prérequis
Avant de commencer, assurez-vous d'avoir installé :
* [Node.js](https://nodejs.org/)
* [MySQL](https://www.mysql.com/) (ou autre base de données compatible Sequelize)
* [Vue.js](https://vuejs.org/)

## Installation

### 1. Configuration du Backend
```bash
cd backend
npm install
```
Configurez la base de données dans `config/config.json`, puis démarrez le serveur :
```bash
npm start
# ou
node app.js
```

### 2. Configuration du Frontend
```bash
cd ../gestion-personnes-emplois/
npm install
npm run serve
```

### 3. Accès à l'application
- Frontend : `http://localhost:8080`
- Backend API : `http://localhost:3000`
- Documentation Swagger : `http://localhost:3000/api-docs`

## Structure du Projet
- `backend/` : Serveur Node.js avec Express
  - `controllers/` : Logique métier
  - `models/` : Modèles Sequelize
  - `routes/` : Routes API
  - `config/` : Configuration base de données
- `gestion-personnes-emplois/` : Application Vue.js
  - `src/components/` : Composants Vue
  - `src/services/` : Services API
  - `src/views/` : Pages de l'application

## Routes API Principales
- `POST /api/persons` : Créer une personne
- `GET /api/persons` : Liste des personnes
- `POST /api/persons/:id/jobs` : Ajouter un emploi
- `GET /api/persons/:id/jobs` : Emplois d'une personne
- `GET /api/companies/:name/persons` : Personnes par entreprise
