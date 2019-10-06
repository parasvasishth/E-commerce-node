const express = require('express')
const app = express();
const routes = require('routes')
const http = require('http')
const url = require('url')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(express.static("./public/uploads"))

// set middle waer in all app
app.use(bodyParser.urlencoded({
  extended: true
}));

var index = require('./routes/index')
var admin = require("./routes/admin")
var signup = require("./routes/signup")
var login = require("./routes/login")
var users = require("./routes/users")
var conlink = require("./routes/connection")
var products = require('./routes/products')



const path = require('path')
const mysql = require('mysql')
const multer = require('multer')
const fs = require('fs')
// app.set("port", process.env.port || 3000)
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs")

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, (file.filename = file.originalname))
  }
})
const upload = multer({
  storage: storage
})


app.get('/', index.index)

app.get('/login', login.login)

app.post('/login_ready', login.login_ready)

app.get("/welcome-admin", admin.admin_dashbord)

app.get("/users-list", admin.users_list)

app.get("/user-deleted/:userId", admin.delete_user)

app.get('/edit_user/:userId', admin.edit_user)

app.post('/edited-user', upload.single("file"), admin.edited_user)

app.get('/user_detail/:userId', admin.user_detail)


app.get("/welcome-user", users.user_dashbord)

app.get('/signup', signup.signup)

app.post('/new-member', upload.single("file"), signup.new_memeber)


app.get('/add-product', products.add_product)

app.post('/product-added', upload.single("file"), products.product_added)

app.get('/products', products.list_products)

app.get('/delete/:Pid', products.delete_product)

app.get('/edit/:Pid', products.edit_product)
app.post('/product-updated', upload.single("file"), products.product_updated)

app.get('/product-detail/:Pid', products.product_detail)
http.createServer(app, function (request, response) {

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
