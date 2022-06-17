const router = require('express').Router();
const {authentication,createUser, authorization} = require('../extras/databaseStuff.js');
const session = require('../server.js');
const path = require('path');

router.get("/",authorization,(req,res)=>{
    res.render('frontend/html/maindashboard.ejs',{username:req.session.username});
});

router.get('/login',(req,res)=>{
    res.render('frontend/html/login.ejs');
});

router.get('/sign',(req,res)=>{
    res.render('frontend/html/sign.ejs');
});

router.post('/sign',createUser,(req,res)=>{
    res.redirect('/login');
});

router.post('/login',authentication,(req,res)=>{
    req.session.username = req.body.username;
    req.session.isAuth = true;
    // res.render('frontend/html/dashboard.ejs',{username:req.session.username});
    res.redirect('/');
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
});

router.get('/requests',authorization,(req,res)=>{
    res.render('frontend/html/requests.ejs');
})

module.exports = router;
