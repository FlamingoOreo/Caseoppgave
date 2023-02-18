module.exports = function(sequelize, Sequelize) {
    const orginformation = sequelize.define('orginformation', {
      organisasjonsformkode: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
      },
      orgbeskrivelse: Sequelize.DataTypes.STRING
    }, {
      timestamps: false
    });
    orginformation.associate = function(models) {
      orginformation.hasOne(models.organization, {
        foreignKey: 'organisasjonsformkode',    // Using orgformkode as the foreign key to connect them
        sourceKey: 'organisasjonsformkode'
      });
    };
    return orginformation;
  };