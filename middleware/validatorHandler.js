function validatorHandler(schema, property = "body") {
  return (req, res, next) => {
    const data = req[property];

    const { error } = schema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((d) => d.message),
      });
    }

    next();
  };
}

module.exports = validatorHandler;