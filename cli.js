require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

// Requires a postgres instance running locally
const sequelize = new Sequelize('postgres://postgres:dbpassword@localhost:5432/postgres')

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    console.log(blogs)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()