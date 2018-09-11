/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lane', {
    lane_id: {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    origin_location_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'location',
        key: 'location_id'
      }
    },
    destination_location_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'location',
        key: 'location_id'
      }
    },
    distance: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    }
  }, {
    tableName: 'lane'
  });
};
