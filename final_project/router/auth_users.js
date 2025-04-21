const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = inputUsername =>{ 
  // users.find(user => user.username == inputUsername)
};


const authenticatedUser = (username,password)=>{
  const match = users.find(user => user.username === username && user.password === password);
  return Boolean(match)
}
//only registered users can login

regd_users.post("/login", (req,res) => {
  //Write your code here
  console.log("first: "+ req.body.username);
  if(authenticatedUser(req.body.username, req.body.password)){
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
