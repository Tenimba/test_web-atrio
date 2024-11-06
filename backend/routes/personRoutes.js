const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
/**
 * @swagger
 * /api/persons:
 *   post:
 *     summary: "Créer une nouvelle personne"
 *     description: "Cette route permet de créer une nouvelle personne dans la base de données."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: "Prénom de la personne"
 *               lastName:
 *                 type: string
 *                 description: "Nom de famille de la personne"
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: "Date de naissance de la personne"
 *     responses:
 *       201:
 *         description: "Personne créée avec succès"
 *       400:
 *         description: "Données invalides"
 */
router.post('/', personController.createPerson);

/**
 * @swagger
 * /api/persons:
 *   get:
 *     summary: "Récupérer toutes les personnes"
 *     description: "Cette route permet de récupérer la liste de toutes les personnes dans la base de données."
 *     responses:
 *       200:
 *         description: "Liste des personnes récupérées"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "ID de la personne"
 *                   firstName:
 *                     type: string
 *                     description: "Prénom de la personne"
 *                   lastName:
 *                     type: string
 *                     description: "Nom de famille de la personne"
 *                   birthDate:
 *                     type: string
 *                     format: date
 *                     description: "Date de naissance de la personne"
 *       404:
 *         description: "Aucune personne trouvée"
 */
router.get('/', personController.getPersons);

module.exports = router;
