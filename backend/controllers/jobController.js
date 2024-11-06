const { Op } = require('sequelize');
const { Job, Person } = require('../models');

exports.createJob = async (req, res) => {
  const { personId } = req.params;
  const { companyName, position, startDate, endDate } = req.body;

  try {
    const person = await Person.findByPk(personId);
    if (!person) {
      return res.status(404).json({ error: "Personne non trouvée." });
    }
    const job = await Job.create({
      companyName,
      position,
      startDate : new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      personId
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getJobsByPersonAndDates = async (req, res) => {
  const { personId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const person = await Person.findByPk(personId);
    if (!person) {
      return res.status(404).json({ error: "Personne non trouvée." });
    }

    const queryConditions = {
      where: { personId },
    };
    if (startDate) {

      if (startDate.startDate) {
        queryConditions.where.startDate = {
          [Op.lte]: new Date(startDate.endDate),
        };
      }

    if (startDate.endDate) {
      queryConditions.where.endDate = {
        [Op.gte]: new Date(startDate.startDate),
      };
    }
    }
    const jobs = await Job.findAll(queryConditions);
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getJobsByPerson = async (req, res) => {
  const { personId } = req.params;
  try {
      const jobs = await Job.findAll({
          where: { personId },
          include: [{ model: Person }]
      });
      res.json(jobs);
  } catch (error) {
      res.status(500).send(error.message);
  }
};
;


