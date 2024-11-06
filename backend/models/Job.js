module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    companyName: DataTypes.STRING,
    position: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    personId: {  // Utilisé dans le code
      type: DataTypes.INTEGER,
      field: 'person_id',  // Nom de la colonne dans la base de données
      references: {
        model: 'People',
        key: 'id',
      },
      allowNull: false,
    }
  });

  Job.associate = (models) => {
    Job.belongsTo(models.Person);
  };

  return Job;
};
