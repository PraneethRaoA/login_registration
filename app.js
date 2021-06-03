const express = require('express');
const bodyParser = require("body-parser");
const user = require('./models/user')
const multer = require("multer");

const upload = multer();
const app = express();
const port = 80
app.set('view engine', 'pug')
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:admin123@cluster0.2cwmv.mongodb.net/User?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(upload.array());

app.get('/', function(req, res)  {
  res.render('index')
})
app.get('/Login', function(req, res)  {
    res.render('Login')
  })
app.get('/register', function(req, res)  {
    res.render('Register')
  })
app.post('/Login', function(req, res){
    user.findOne({username:req.body.username},function(err,docs){
        if(err){
            console.log(err);
        }
        else{
            
            if(docs.username==req.body.username && docs.password==req.body.password){
                res.send("welcome");
            }
            else{
                console.log("invalid")
                res.redirect('Register');
            }
        }
    })

})
app.post('/Register', function(req, res){
  //console.log(req.body)
  const newUser=new user();
  newUser.name=req.body.name;
  newUser.username=req.body.username;
  newUser.password=req.body.password;
  newUser.DoB=req.body.DoB;
  newUser.Mobile=req.body.Mobile;

  newUser.save(function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect('Login');
    }
  })

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})