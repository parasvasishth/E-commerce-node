// add product
// edit product
// delete product
// detail view

// this is the connection with database 
const mysql = require('mysql');
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


// this funcation add product with html file
exports.add_product = function (req, res) {
  // res.render('add_products')
  res.sendFile('/home/batman/WebstormProjects/opps/node/e-com_assinment/public/add_product.html');
};

// this method add product details in database
exports.product_added = function (req, res) {
  var pname = req.body.pname;
  var qty = req.body.qty;
  var sku = req.body.sku;
  var desc = req.body.descrp;
  var price = req.body.price;
  var category = req.body.category;
  var photo = req.file.filename;
  var sql =
    "insert into products(pname,qty,sku,description,price,photo,category) values('" +
    pname +
    "','" +
    qty +
    "','" +
    sku +
    "','" +
    desc +
    "','" +
    price +
    "','" +
    photo +
    "','" +
    category +
    "')";
  con.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.redirect('/products');
    } else {
      res.end('we need to do it again!');
    }
  });
};


// this method get all products from database and list it out
exports.list_products = function (req, res) {
  var sql = 'select * from products';
  con.query(sql, function (err, rows) {
    if (err) throw err;
    res.render('products/show_pro', {
      data: rows
    });
  });
};


// this funcation delete the product from database  with the help of Pid
exports.delete_product = function (req, res) {
  var sql = 'delete from products where Pid=' + req.params.Pid;
  con.query(sql, function (err, rows) {
    if (err) throw err;
    res.redirect('/products');
  });
};



// this funcation edit the product from database  with the help of Pid

exports.edit_product = function (req, res) {
  var sql = 'select * from products where Pid=' + req.params.Pid;
  con.query(sql, function (err, rows) {
    if (err) throw err;
    res.render('products/edit_pro', {
      data: rows
    });
  });
};


// this funcation send edited details in the database


exports.product_updated = function (req, res) {
  var Pid = req.body.Pid;
  var Pname = req.body.pname;
  var qty = req.body.qty;
  var sku = req.body.sku;
  var desc = req.body.descrp;
  var price = req.body.price;
  var category = req.body.category;
  var photo = req.file.filename;

  var sql =
    "UPDATE products SET Pname='" +
    Pname +
    "',qty='" +
    qty +
    "',sku='" +
    sku +
    "',description='" +
    desc +
    "',price='" +
    price +
    "',photo='" +
    photo +
    "',category='" +
    category +
    "' WHERE Pid= " +
    req.body.Pid;

  con.query(sql, function (err, rows) {
    if (err) throw err;
    res.redirect('/products');
  });
};



// this product show the detail view if the products

exports.product_detail = function (req, res) {
  var sql = 'select * from products where Pid=' + req.params.Pid;
  con.query(sql, function (err, rows) {
    if (err) throw err;
    res.render('products/detail_view', {
      data: rows
    });
  });
};
