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

regd_users.post("/login", async (req,res) => {
  //Write your code here
  if(await authenticatedUser(req.body.username, req.body.password)){
    res.status(201).json("Welcome " + req.body.username);
  }else{
    res.status(401).json("Username or password is incorrect");
  }
});

regd_users.get("/login", (req,res) => {
  res.status(201).json(users);
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
