const express = require("express");

const router = express.Router();

const Admin = require("../models/Admin.model");

const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const passport = require("passport");


const {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../config/auth_admin");
const Lecturer = require("../models/Lecturer.model");

// Home Page


router.get("/homepage", ensureAuthenticated,  (req, res) => {
  res.render("admin/common/home", {
    user: req.user,
  })
});

router.get("/account/edit", ensureAuthenticated,  (req, res) => {
    res.render("admin/account/edit", {
      user: req.user,
    })
});

router.get("/", ensureAuthenticated,  (req, res) => {
    console.log(req.user);
    res.render("admin/common/home", {
      user: req.user,
    })
});

router.get("/login", function (req, res) {
  const data = [];
  res.render("admin/common/login",{
    data
  });
});



router.post(
  "/login",
  passport.authenticate("admin", {
    failureRedirect: "/admin/login",
    successRedirect: "/admin/homepage",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/admin/login");
});

router.get("/register", function (req, res) {
  let data = [];
  const user = [];
  res.render("admin/common/register",{
    user,data
  });
});

router.get("/is-user-available", function (req, res) {
    Admin.findOne({email:req.query.email}).then((user)=>{
    if(user){
      res.json(false);
    }else{
      res.json(true);
    }
  })
});

router.post("/register",async function (req, res) {
  const {
    email,
    password,
    re_password
  } = req.body; 
  if(password == re_password){

    const name = "minh";
    const gender = "nam";

    const newUser = new Lecturer({
      email ,
      password,
      name,
      gender
    });

    newUser.password =  await bcrypt.hash(newUser.password, 10);
    newUser.save().then(()=>{
      console.log("user save");
    });
  }
  res.redirect("/admin/register");
});
module.exports = router;