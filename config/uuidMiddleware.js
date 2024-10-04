const { validate: isUuid } = require('uuid');

const uuidValidationMiddleware = (paramName) => {
  return (req, res, next) => {
    const uuid = req.params[paramName];

    if (!isUuid(uuid)) {
      return res.status(400).json({ message: `Invalid UUID format for ${paramName}` });
    }

    next();
  };
};

module.exports = uuidValidationMiddleware;
