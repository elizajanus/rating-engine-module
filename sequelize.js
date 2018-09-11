const Sequelize = require('sequelize');
const CustomerModel = require('./models/customer')
const LocationModel = require('./models/location')
const LaneModel = require('./models/lane')
const RateRuleModel = require('./models/rate_rule')
const RateOutputModel = require('./models/rate_output')

const sequelize = new Sequelize('socialautotransport_rating', '***********', '************', {
    host: 'mysql.socialautotransport.com',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    logging: console.log
});

const Customer = CustomerModel(sequelize, Sequelize)
const Location = LocationModel(sequelize, Sequelize)
const Lane = LaneModel(sequelize, Sequelize)
const RateRule = RateRuleModel(sequelize, Sequelize)
const RateOutput = RateOutputModel(sequelize, Sequelize)

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Customer,
  Location,
  Lane,
  RateRule,
  RateOutput,
  sequelize
}