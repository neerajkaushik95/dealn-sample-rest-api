const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/users - Create new user */
router.route('/create').post(validate(paramValidation.createUser), userCtrl.create);

module.exports = router;
