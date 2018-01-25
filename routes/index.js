var express = require('express');
var router = express.Router();
var XMLHttpRequest = require('xhr2');
/* GET home page. */
router.get('/send', function (req, res)
{
    console.log(req.originalUrl);
    console.log('Accessing Homepage');
    res.end('Wahahaha!');
});

router.post('/send', function (req, res)
{
    console.log('Getting request: ', req.body.longUrl);
    //console.log('Getting request: ', req.body);
    //res.send(req.body.longUrl);
    var xhttp = new XMLHttpRequest();
    console.log('XHTTP Request 2 : '+ xhttp);
    xhttp.onreadystatechange = function ()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            console.log('Aha@! Resulting Value : ',this.responseText);
            res.send(this.responseText);
        }
    };
    xhttp.open('POST', 'http://localhost:3081/send', true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.responseType = 'text';
    var sentObject = JSON.stringify({longUrl: req.body.longUrl});
    xhttp.send(sentObject);
});

router.get('/home', function(req, res, next)
{

    res.render('index', { title: 'Express' });
});
router.get('/\\w+/', function(req, res, next)
{
    console.log(req.originalUrl);

    var shortURL = req.originalUrl.substr(1);


    var xhttp = new XMLHttpRequest();
    console.log('XHTTP Request 2 : '+ xhttp);
    xhttp.onreadystatechange = function ()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            console.log('Aha@! Resulting Value : ',this.responseText);
            res.redirect(this.responseText);
        }
    };
    xhttp.open('POST', 'http://localhost:3081/retrieve', true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.responseType = 'text';
    var sentObject = JSON.stringify({shortUrl: shortURL});
    xhttp.send(sentObject);
});

module.exports = router;
