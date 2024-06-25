const router = require('express').Router()
const { User, UserSession } = require('../models')
const tokenExtractor = require('../utils/tokenExtractor')
const sessionFinder = require('../utils/sessionFinder')

router.delete('/', tokenExtractor, sessionFinder, async (req, res) => {
  let user = await User.findOne({
    where: {
      username: req.decodedToken.username
    }
  })

  user = user.toJSON()
  
  await UserSession.destroy({
    where: {
      user_id: user.id
    }
  })

  res.status(204).end()
})

module.exports = router