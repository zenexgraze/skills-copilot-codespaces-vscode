// Create web server and listen on port 3000
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function(req, res) {
  res.send(comments);
});

app.post('/comments', function(req, res) {
  var newComment = req.body;
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send('Comment added');
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
