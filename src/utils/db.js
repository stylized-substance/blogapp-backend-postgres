const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')
const { Blog, User } = require('../models')
const { blogs, users } = require('../data/dummydata')

const sequelize = new Sequelize(DATABASE_URL)

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'src/migrations/*.js'
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console
  })

  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name)
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')

    // Initialize db with some data
    //Blog.bulkCreate(blogs)
    //User.bulkCreate(users)
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    console.log('failed to connect to the database, error:', err)
    // eslint-disable-next-line no-undef
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }