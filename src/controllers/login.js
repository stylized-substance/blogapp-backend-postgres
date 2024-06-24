const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const { User, UserSession } = require('../models')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  const existingSession = await UserSession.findOne({
    where: {
      user_id: user.id
    }
  })

  if (existingSession) {
    res.status(400).send('You are already logged in')
    return
  }

  await UserSession.create({
    user_id: user.id,
    access_token: token
  })
  

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router