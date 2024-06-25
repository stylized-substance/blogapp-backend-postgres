const { UserSession } = require("../models");

const sessionFinder = async (req, res, next) => {
  let session = await UserSession.findOne({
    where: {
      user_id: req.decodedToken.id,
      access_token: req.accessToken,
    },
  });

  if (!session || session.session_valid === false) {
    res.status(401).json(`You don't have a valid login session`);
    return;
  }

  next();
};

module.exports = sessionFinder;
