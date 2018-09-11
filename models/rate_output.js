/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('rate_output', {
      output_id: {
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
      move_id: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      matched_lane_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'lane',
          key: 'lane_id'
        }
      },
      matched_rule_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'rate_rule',
          key: 'rule_id'
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
      actual_distance: {
        type: DataTypes.INTEGER(6),
        allowNull: false
      },
      lane_distance: {
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
      },
      sla: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(6,3),
        allowNull: false
      }
    }, {
      tableName: 'rate_output'
    });
  };
  