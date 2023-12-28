var express = require('express');
const passport = require('passport');
const userModel = require("./users")
var router = express.Router();

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


router.get('/', function(req, res) {
  res.render('index', {error: req.flash("error")});
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/password/reset', function(req, res) {
  res.render('forgotPassword');
});

router.get("/profile", isLoggedIn , async function(req, res) {
 const user = await userModel.findOne({username: req.session.passport.user});
 function extractUsername(email) {
  if (email.includes('@')) {
      const username = email.split('@')[0];
      return username;
  } else {
      return null;
  }
}
const gmailAddress = user.username;
const username = extractUsername(gmailAddress);

const name = user.fullName;
const accountlogo = name.split("")[0];

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', "purple","amber","lime","emerald"];
function generateRandomColorName() {
    const randomColor = colors[Math.floor(Math.random() * 10)+1];
    return  randomColor;
}
const randomColorName = generateRandomColorName();
console.log("Random Color Name:", randomColorName);
const clr = randomColorName;

  res.render('profile',{following: user.following.length, username: username,followers: user.followers.length, fullname: user.fullName, accountLogo: accountlogo, color: clr});
  res.render("nav-bar",{accountLogo: accountlogo, color: clr})
});

router.get('/settings/profile',isLoggedIn, function(req, res) {
  res.render("edit_profile");
});

router.get('/pin-creation-tool', isLoggedIn , function(req, res) {
  res.render('create-pin');
});

router.post('/register', function(req, res) {
  const userdata = new userModel({
    username: req.body.username,
    fullName: req.body.fullname,
    dateOfBirth: req.body.dob
  })

  userModel.register(userdata, req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
});

router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true,
}),function(req,res){});

router.post("/logout",function(req,res,next){
  req.logOut(function(err){
    if(err){
      return next(err); 
    }
    res.redirect("/");
  })
})

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated())
  return next();
  res.redirect("/");
}

module.exports = router;
