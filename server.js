var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));
app.set('views', (__dirname + '/public'))
app.set('view engine', 'pug')

app.get('/', function(req, res) { // Serves up homepage
    var url = req.protocol + "://" + req.get('host')
    res.render('index', {url: url})
})

app.get("*", function(req, res) { // 404
  res.end("404!"); // 404
})

app.listen(port, function () {
  console.log('File metadata app listening on port ' + port + '!')
})