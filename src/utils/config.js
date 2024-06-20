/* eslint-disable no-undef */
require('dotenv').config()

const DATABASE_URL = process.env.INDOCKER === 'true' ? process.env.DATABASE_URL : 'postgres://postgres:dbpassword@localhost:5432/postgres'

module.exports = {
  DATABASE_URL: DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: 'jwtsecret'
}