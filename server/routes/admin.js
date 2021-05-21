const router = require('express').Router();
let Cart = require('../models/cart.model');
const { protect } = require('../middleware/auth');
const AdminController = require("../controllers/admin.controller");


router.route("/").get( AdminController.getList)


module.exports = router;