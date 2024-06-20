const express = require('express')
require('express-async-errors')
const app = express()
const errorHandler = require('./utils/errorHandler')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readinglistsRouter = require('./controllers/readinglists')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readinglistsRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}

start()