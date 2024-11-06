const express = require('express');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const jobRoutes = require('./routes/jobRoutes');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/persons', personRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/api', (req, res) => {
  res.send('Bienvenue sur l\'API de gestion des personnes et emplois');
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de données synchronisée.');
  })
  .catch((error) => {
    console.error('Erreur de synchronisation de la base de données:', error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;
