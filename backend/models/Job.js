module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
      companyName: DataTypes.STRING,
      position: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      personId: {
        type: DataTypes.INTEGER,
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
  