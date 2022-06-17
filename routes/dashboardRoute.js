const { authorization } = require('../extras/databaseStuff');

const dashboard = require('express').Router();

dashboard.get('/',authorization,(req,res)=>{
    res.render('frontend/html/dashboard.ejs',{username:req.session.username});
});




module.exports = dashboard;