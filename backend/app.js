const express = require('express');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const jobRoutes = require('./routes/jobRoutes');
const { sequelize } = require('./models');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/persons', personRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/api', (req, res) => {
  res.send("Bienvenue sur l'API de gestion des personnes et emplois");
});

const configPath = path.resolve(__dirname, './config/config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { username, password, database, host } = configData.development;

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: host,
      user: username,
      password: password,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
    console.log("Base de données vérifiée ou créée.");
    await connection.end();

    await sequelize.sync({ force: false });
    console.log("Base de données synchronisée avec Sequelize.");
  } catch (error) {
    console.error("Erreur d'initialisation de la base de données:", error);
  }
}
initializeDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;
