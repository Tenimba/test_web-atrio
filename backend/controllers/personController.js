const { Person, Job } = require('../models');

exports.createPerson = async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;
    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    
    if (age < 0 || age > 150) {
      return res.status(400).json({ error: "La date de naissance doit être valide et la personne doit avoir moins de 150 ans." });
    }
    
    const person = await Person.create({ firstName, lastName, birthDate });
    res.status(201).json(person);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPersons = async (req, res) => {
  try {
    const persons = await Person.findAll({
      include: [{ model: Job }]
    });
    res.json(persons);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

