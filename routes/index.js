const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");

router.get("/", (req, res) => {
   res.render("index", {title: "Kam 3 Homepage"});
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
   res.render("users/dashboard", { title: "Kam 3 dashboard", user: req.user });
 });

module.exports = router;