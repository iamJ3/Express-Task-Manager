const express = require('express');//This line imports the express module, a popular Node.js framework used to build web applications and APIs.
const app = express();//This creates an instance of an Express application. The app object is used to define routes, middleware, and other application logic.
const fs = require('fs')
const path = require('path')
app.set("view engine", "ejs")//This sets the view engine for the application to EJS (Embedded JavaScript). EJS is a templating engine that allows you to generate HTML dynamically.

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        res.render("index", { file: files })
    })
})
app.get('/files/:filename', function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        res.render('show', { filename: req.params.filename, filedata: filedata })
    })

})
app.get('/edit/:filename', function (req, res) {
    res.render('edit', { filename: req.params.filename })

})
app.post('/edit', function (req, res) {
    fs.rename(`./files/${req.body.prev}`, `./files/${req.body.new}`, function(){
        res.redirect('/')
    })
})

app.post('/create', function (req, res) {
    console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`, req.body.details, function (err) {
        res.redirect("/")
    })

})
app.listen(3000);