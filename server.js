var express = require('express')
var multer = require('multer')
var cookieParser = require('cookie-parser')
var session = require('express-session')

var app = express()
var port = process.env.PORT || 3000
var upload = multer()

app.use(cookieParser())
app.use(session({secret: '1234567890QWERTY', resave: false, saveUninitialized: true}))

app.use(express.static(__dirname + '/public'));
app.set('views', (__dirname + '/public'))
app.set('view engine', 'pug')

app.get('/', function(req, res) { // Serves up homepage
    res.render('index')
})

app.post('/', upload.single('upl'), function(req,res){
	req.session.filesize = req.file.size
	res.redirect("/file-size")
})

app.get('/file-size', function(req, res) {
    res.json({
        "size": req.session.filesize
    })
    req.session.filesize = null
})

app.get("*", function(req, res) { // 404
  res.end("404!"); // 404
})

app.listen(port, function () {
  console.log('File metadata app listening on port ' + port + '!')
})