/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rate_rule', {
    rule_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    distance_start: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    distance_end: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    rate: {
      type: DataTypes.DECIMAL(6,3),
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    class: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'rate_rule'
  });
};
