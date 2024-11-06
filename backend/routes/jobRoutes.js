const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');


router.post('/:personId/jobs', jobController.createJob);
router.get('/:personId/jobs', jobController.getJobsByPersonAndDates);
router.get('/', jobController.getJobs);

module.exports = router;
