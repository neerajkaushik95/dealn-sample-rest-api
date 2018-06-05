const User = require('./user.model');
const _ = require('lodash');

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    uid: req.body.uid,
    role: req.body.role,
    password: req.body.password
  });

  user.save()
    .then((savedUser) => {
      res.status(201).json({
        message: 'User created',
        staus: 201,
        data: _.pick(savedUser, ['email', 'uid', 'firstName', 'lastName', 'role'])
      });
    })
    .catch(e => next(e));
}

module.exports = { create };
