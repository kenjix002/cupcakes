const router = require('express').Router();
let Cart = require('../models/cart.model');
const CartController = require("../controllers/cart.controller");
// for user cart


router.route("/add").post(CartController.addItem)


module.exports = router;