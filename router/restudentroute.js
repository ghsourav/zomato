const express = require("express");
const router = express.Router();
const multer = require("multer");
//load storage module
const uploadLocal = require("../config/multer");
var upload = multer({ storage: uploadLocal.storage });


router.get("/", (req, res) => res.render("./rest/rest_home",{title:"Restaurants near you"}));
router.get("/order", (req, res) => res.render("./rest/order",{title:"Restaurants near you"}));

module.exports=router;