const mysql = require("mysql")
exports.connect = function (req, res) {
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

};
