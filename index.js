const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDataBase } = require('./utils/db')

const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDataBase()
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}