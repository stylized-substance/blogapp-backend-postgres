const errorHandler = (error, request, response, next) => {
  console.error("errorhandler", error);
  console.error("error name", error.name);

  if (error.name === "SequelizeValidationError") {
    return response
      .status(400)
      .send({ SequelizeValidationError: error.errors });
  }

  if (error.name === "SequelizeDatabaseError") {
    return response.status(400).send({ SequelizeDatabaseError: error });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return response.status(400).send({ SequelizeUniqueConstraintError: error });
  }

  next(error);
};

module.exports = errorHandler;
