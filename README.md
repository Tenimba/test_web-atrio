# Projet API Gestion des Personnes et Emplois

## Description

Cette API permet de gérer des informations sur des **Personnes** et leurs **Emplois**. Elle permet de :
- Créer des personnes avec des informations de base (nom, prénom, date de naissance).
- Ajouter des emplois à ces personnes, en gérant les dates de début et de fin d'emploi.
- Effectuer des recherches sur les personnes et leurs emplois.

L'application dispose également d'une **interface front-end** pour interagir avec l'API et d'une **documentation Swagger** pour tester les routes API.

## Fonctionnalités

### 1. **Gestion des Personnes**
- Créer une nouvelle personne avec les champs `firstName`, `lastName`, et `birthDate`. 
- L'application valide l'âge de la personne : seules les personnes de moins de 150 ans peuvent être enregistrées.

### 2. **Gestion des Emplois**
- Ajouter un emploi pour une personne avec `companyName`, `position`, `startDate`, et `endDate`.
  - La date de fin est facultative pour le poste actuellement occupé.
  - Une personne peut avoir plusieurs emplois avec des dates qui se chevauchent.

### 3. **Fonctionnalités Front-End**
- Sauvegarder une nouvelle personne. L'interface vérifie si la personne est âgée de moins de 150 ans avant d'enregistrer les données.
- Ajouter des emplois à une personne via un formulaire avec les dates de début et de fin.
- Afficher toutes les personnes enregistrées par ordre alphabétique, leur âge et leurs emplois actuels.
- Afficher toutes les personnes ayant travaillé dans une entreprise donnée.
- Afficher tous les emplois d'une personne entre deux dates spécifiques.

### 4. **Recherche et Filtres**
- Recherche des emplois d'une personne entre deux dates données (startDate et endDate).
- Affichage de la liste des personnes ayant travaillé pour une entreprise spécifique.

### 5. **Documentation API**
- La documentation Swagger permet de tester les différentes routes de l'API directement dans le navigateur.

## Installation

### Prérequis

Avant de commencer, assurez-vous que vous avez installé les logiciels suivants :

- [Node.js]
- [MySQL] ou toute autre base de données compatible avec Sequelize.
-[Vue.js]

### 1. Cloner le repository

```bash
git clone https://github.com/Tenimba/testTechnique.git
```

### 2. Installer le back
```
cd backend
npm install
configue db dans confi/config.json
npm start ou node app.js
```
### 3.Installer du Front-End
```
cd ../gestion-personnes-emplois/ 
npm install
npm run serve
```

### 4.Documentation API (Swagger)
La documentation de l'API est générée automatiquement avec Swagger et accessible à l'adresse suivante :

http://localhost:3000/api-docs