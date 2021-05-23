const router = require('express').Router();
let Cart = require('../models/cart.model');
const CartController = require("../controllers/cart.controller");


router.route("/add").post(CartController.addItem)

router.route("/").get(CartController.findCart)

router.route("/remove").post(CartController.removeCartItem)

router.route("/completecart").post(CartController.complete)

module.exports = router;