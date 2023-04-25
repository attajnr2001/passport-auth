const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login", { title: "Kam 3 Login Page" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Kam 3 Register Page" });
});


router.post("/register", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    address,
    phone,
    dob,
    gender,
    password,
    password2,
    role,
  } = req.body;

  let errors = [];

  if (
    !firstName ||
    !lastName ||
    !email ||
    !address ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !password2 ||
    !role
  ) {
    errors.push({ msg: "please fill all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "password must be more than 6 letters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      title: "Kam 3 Register Page",
      errors,
      firstName,
      lastName,
      email,
      address,
      phone,
      dob,
      gender,
      password,
      password2,
      role,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "email already exists" });
        res.render("register", {
          title: "Kam 3 Register Page",
          errors,
          firstName,
          lastName,
          email,
          address,
          phone,
          dob,
          gender,
          password,
          password2,
          role,
        });
      } else {
         const newUser = new User({
            firstName,
            lastName,
            email,
            address,
            phone,
            dob,
            gender,
            password,
            role,
         });
         
         // hashing
         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
               if(err) throw err;

               newUser.password = hash;
               newUser.save()
               .then(user =>{
                  req.flash("success_msg", "Registration successful")
                  res.redirect("/users/login")
               })
               .catch(err => console.log(err))
            })
         })
      }
    });
  }
});


router.post("/login", (req, res, next) => {
   passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
   })(req, res, next);
})


router.get("/logout", (req, res) => {
   req.logout((err) => {
      if(err) throw err;
   });
   res.redirect("/users/login")
})

module.exports = router;
