require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const bcrypt = require('bcryptjs');


let users = [];

const isValid = inputUsername =>{ 
  // users.find(user => user.username == inputUsername)
};


const authenticatedUser = async (username,password)=>{
  const passwordMatcher = async (username , inputPassword) =>{
    try{
      if(await bcrypt.compare(inputPassword , users.find(user => user.username === username).password)){
        return true;
      }
    }catch{
      return false;
    }
  }

  if(users.find(user => user.username === username)){
    if(await passwordMatcher(username, password)){
      return true;
    }else{
      return false;
    }
  }
}
//only registered users can login

function authenticateToken(req, res, next){
  const authHeader = req.headers["authorization"]
  console.log("authHeader: " + authHeader)
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token);
  if(token == null){return res.status(401).json({err: "token not defined"})}
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if(err)return res.status(403).json({err: "Failed verification"});
    req.user = user
    next() 
  })
}

regd_users.post("/login", async (req,res) => {
  //Write your code here
  if(await authenticatedUser(req.body.username, req.body.password)){
    const username = req.body.username
    const user = {name : username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    console.log(process.env.ACCESS_TOKEN_SECRET)
    console.log("testing")
    res.status(201).json({accessToken : accessToken}); 
  }else{
    res.status(401).json("Username or password is incorrect");
  }
});

regd_users.get("/login" , authenticateToken, (req,res) => {
  res.status(201).json("Successful middlware" + users);
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  return res.status(201).json({message: "YOU DID IT DARRELL"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
