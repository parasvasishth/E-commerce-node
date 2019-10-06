const express = require('express')
const mysql = require('mysql')
// const con = require('./connection')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecom"
});
con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
})



exports.login = function (req, res) {
  res.render('login')
}

exports.login_ready = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  con.query(
    "select * from user where username='" + username + "'and password='" + password + "'",
    function (err, result) {
      if (err) throw err;
      if (result.length) {
        if (result[0].username == 'admin' && result[0].password == 'admin') {
          res.redirect('/welcome-admin');
        } else {
          res.redirect('/welcome-user');
        }
      } else {
        res.end('invalid user');
      }
    }
  );

};
