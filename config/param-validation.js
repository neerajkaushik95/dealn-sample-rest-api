const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      password: Joi.required(),
      lastName: Joi.string().required(),
      firstName: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().email().required(),
      uid: Joi.string().required()
    }
  }
};
