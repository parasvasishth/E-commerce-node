var path = require('path');

var public = path.join(__dirname, '/../', 'public');
// const con = require('./connection')

const mysql = require("mysql")
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

// var public = require('../public')
exports.signup = function (req, res) {
  // ask sir to get the public html in js in short path
  res.sendFile(path.join(public, 'signup.html'));
  // res.sendFile('/home/batman/WebstormProjects/opps/node/e-com_assinment/public/signup.html');
  // res.render('signup')
}


exports.new_memeber = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var address = req.body.address;
  var city = req.body.city;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var gender = req.body.gender;
  var type = req.body.type;
  var photo = req.file.filename;

  var sql = "insert into user(username,password,address,city,email,contact,gender,type,image) values('" + username + "','" + password + "','" + address + "','" + city + "','" + email + "','" + mobile + "','" + gender + "','" + type + "','" + photo + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.redirect("login");
    } else {
      res.end("we need to try again!");
    }
  });
};
