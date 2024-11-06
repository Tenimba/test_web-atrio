const { Person } = require('../models');

exports.createPerson = async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;
    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    
    const person = await Person.create({ firstName, lastName, birthDate });
    res.status(201).json(person);
  } catch (error) {
    res.status(500).send(error.message);
  }
};