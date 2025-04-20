const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = inputUsername =>{ //returns boolean
  return(users.find(user => {
    return(user.username == inputUsername)
  }))
};


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  if(isValid(req.body.username)){
    res.status(201).json("Welcome " + req.body.username);
  }else{
    res.status(301).json("Username not found");
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
