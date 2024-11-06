module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('Person', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      birthDate: DataTypes.DATE
    });
  
    Person.associate = (models) => {
      Person.hasMany(models.Job, { foreignKey: 'personId' });
    };
  
    return Person;
  };
  