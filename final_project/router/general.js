const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const bycrypt = require('bcryptjs');


public_users.post("/register", (req,res) => {
  if(users.find(user => user.username == req.body.username)){
    res.status(401).json(`Username has been taken, choose another one`);    
  }
  users.push({username : req.body.username , password : req.body.password});
  res.status(201).json(`Congratulations ${req.body.username} your account has been registered!`);
});

public_users.get("/register", (req,res) => {
  res.status(201).json(users);
})


// Get the book list available in the shop
public_users.get('/', (req, res) => {
  const titles = Object.values(books).map(book => book.title);
  res.status(201).json(titles);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let target_book = Object.values(books)[(req.params.isbn) - 1];
  res.status(201).json(target_book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let target_book = Object.values(books).filter(e => e.author == req.params.author);
  res.status(201).json(target_book[0]);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let target_book = Object.values(books).filter(e => e.title == req.params.title);
  let result =   
    "Author: " + target_book[0].author + "\n"+
    "Title: " + target_book[0].title + "\n" +
    "Reviews: " + target_book[0].reviews;
    res.status(201).json(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let target_book = Object.values(books)[(req.params.isbn)-1];
  res.status(201).json("Review of "+ target_book.title + " : " + target_book.reviews);
});

module.exports.general = public_users;