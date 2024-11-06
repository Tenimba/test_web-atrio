const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

/**
 * @swagger
 * /api/jobs/{personId}/jobs:
 *   post:
 *     summary: "Ajouter un emploi à une personne"
 *     description: "Cette route permet d'ajouter un emploi à une personne spécifique en fonction de son ID."
 *     parameters:
 *       - in: path
 *         name: personId
 *         required: true
 *         description: "L'ID de la personne à qui ajouter l'emploi"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               position:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: "Emploi ajouté avec succès"
 *       400:
 *         description: "Données invalides"
 */
router.post('/:personId/jobs', jobController.createJob);

/**
 * @swagger
 * /api/jobs/{personId}/jobs:
 *   get:
 *     summary: "Récupérer les emplois d'une personne"
 *     description: "Cette route permet de récupérer la liste des emplois d'une personne spécifique en fonction de son ID."
 *     parameters:
 *       - in: path
 *         name: personId
 *         required: true
 *         description: "L'ID de la personne dont récupérer les emplois"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Liste des emplois récupérés"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   companyName:
 *                     type: string
 *                   position:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 *       404:
 *         description: "Personne non trouvée"
 */
router.get('/:personId/jobs', jobController.getJobsByPersonAndDates);

/**
 * @swagger
 * /api/jobs/{personId}/jobs:
 *   get:
 *     summary: "Retourner tous les emplois"
 *     description: "Cette route permet de récupérer tous les emplois dans la base de données."
 *     responses:
 *       200:
 *         description: "Liste de tous les emplois"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   companyName:
 *                     type: string
 *                   position:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 */
router.get('/', jobController.getJobs);

module.exports = router;
