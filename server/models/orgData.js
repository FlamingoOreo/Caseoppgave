module.exports = function(sequelize, Sequelize) {
    const organization = sequelize.define('organization', { // Defines the table name
      organisasjonsnummer: {
        type: Sequelize.DataTypes.INTEGER, // These are the columns of the table and their datatype
        primaryKey: true,
      },
      navn: Sequelize.DataTypes.STRING,
      organisasjonsformkode: Sequelize.DataTypes.STRING,
      registreringsdato: Sequelize.DataTypes.DATE
    }, {
      timestamps: false
    });
    organization.associate = function(models) { // Assosicates (relationship) with the orginfo table.
      organization.belongsTo(models.orginformation, {
        foreignKey: 'organisasjonsformkode',  // Using orgformkode as the foreign key to connect them
        targetKey: 'organisasjonsformkode'
      });
    };
    return organization;
  };
  