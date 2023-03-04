//* middlewares/Validator.js
const createHttpError = require("http-errors");
//* Include joi to check error type
const Joi = require("joi");
//* Include all Schemas
const Schemas = require("../schema");

module.exports = function (validator) {
  //! If validator is not exist, throw err
  if (!Schemas.hasOwnProperty(validator))
    throw new Error(`'${validator}' Schema doesn't exist`);

  return async function (req, res, next) {
    try {
      const validated = await Schemas[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi)
        return next(createHttpError(422, { message: err.message }));
      next(createHttpError(500));
    }
  };
};
