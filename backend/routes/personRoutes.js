const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
const jobController = require('../controllers/jobController');

router.post('/', personController.createPerson);
router.get('/', personController.getPersons);

module.exports = router;
