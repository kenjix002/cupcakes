const router = require('express').Router();
let User = require('../models/user.model');

const UserController = require('../controllers/users.controller');

router.route("/register").post(UserController.register)

router.route("/login").post(UserController.login)

router.route("/getUser").get(UserController.getOneUser)

module.exports = router;