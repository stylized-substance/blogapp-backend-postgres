const { UserSession } = require('../models')

const sessionFinder = async (req, res, next) => {
  let session = await UserSession.findOne({
    where: {
      user_id: req.decodedToken.id,
      access_token: req.accessToken
    }
  })
  
  if (session && session.session_valid === true) {
    req.session_valid = true
  } else {
    req.session_valid = false
  }

  next()
}

module.exports = sessionFinder