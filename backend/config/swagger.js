const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mon API de gestion des personnes',
    version: '1.0.0',
    description: 'Une API permettant de gérer les personnes et leurs emplois',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Serveur local',
    },
  ],
  components: {
    schemas: {
      Person: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Identifiant unique de la personne',
          },
          firstName: {
            type: 'string',
            description: 'Prénom de la personne',
          },
          lastName: {
            type: 'string',
            description: 'Nom de famille de la personne',
          },
          birthDate: {
            type: 'string',
            format: 'date',
            description: 'Date de naissance de la personne',
          }
        },
        required: ['firstName', 'lastName', 'birthDate'],  // Champs obligatoires pour créer une personne
      },
      Job: {
        type: 'object',
        properties: {
          companyName: {
            type: 'string',
            description: 'Nom de l\'entreprise où travaille la personne',
          },
          position: {
            type: 'string',
            description: 'Poste occupé par la personne',
          },
          startDate: {
            type: 'string',
            format: 'date',
            description: 'Date de début de l\'emploi',
          },
          endDate: {
            type: 'string',
            format: 'date',
            description: 'Date de fin de l\'emploi (optionnelle)',
          },
          personId: {
            type: 'integer',
            description: 'ID de la personne qui occupe cet emploi',
          }
        },
        required: ['companyName', 'position', 'startDate', 'personId'],
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
