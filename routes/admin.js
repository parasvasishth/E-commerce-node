const mysql = require('mysql');
var path = require('path');

var public = path.join(__dirname, '/../', 'public');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecom'
});
con.connect(function (err) {
  if (err) throw err;
  console.log('connected');
});

exports.admin_dashbord = function (req, res) {
  res.render('admin/admin')
}


exports.users_list = function (req, res) {
  var sql = 'select * from user';
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('admin/list_users', {
      data: result
    })
  })
}


exports.delete_user = function (req, res) {
  var sql = 'delete from user where userId=' + req.params.userId;
  con.query(sql, function (err, rows) {
    if (err) throw err;
    res.redirect('/users-list');
  });
};


exports.edit_user = function (req, res) {
  var sql = 'select * from user where userId=' + req.params.userId;
  con.query(sql, function (err, rows) {
    if (err) throw err;
    res.render('admin/edit_user', {
      data: rows
    });
  });
};

exports.edited_user = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var address = req.body.address;
  var city = req.body.city;
  var email = req.body.email;
  var contact = req.body.contact;
  var gender = req.body.gender;
  var type = req.body.type;
  var photo = req.file.filename;
  var userId = req.body.userId;


  var sql =
    "UPDATE user SET username='" +
    username +
    "',password='" +
    password +
    "',address='" +
    address +
    "',city='" +
    city +
    "',email='" +
    email +
    "',contact='" +
    contact +
    "',gender='" +
    gender +
    "',type='" +
    type +
    "',image='" +
    photo +
    "' WHERE userId= " +
    req.body.userId;
  con.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.redirect("/users-list");
    } else {
      res.end("we need to try again!");
    }
  });
};


exports.user_detail = function (req, res) {
  var sql = 'select * from user where userId=' + req.params.userId;
  con.query(sql, function (err, rows) {
    if (err) throw err;
    res.render('admin/user_detail', {
      data: rows
    });
  });
};
