var express = require('express');
var multer  = require('multer')

var upload = multer();
var app = express();

// receive file
app.post('/', upload.single('filename'), function (req, res, next) {
    try {
        res.json({size: req.file.size});
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// Any url
app.get('*', function (req, res) {
    var html = 'Please submit a file to know its size<br><br>' +
               '<form action="/" method="post" enctype="multipart/form-data">' +
               'File: ' +
               '<input type="file" name="filename"/>' +
               '   ' +
               '<button type="submit">Submit</button>' +
               '</form>';

    res.send(html);
});

app.listen(process.env.PORT || 8080, function () {
    console.log('App started');
});