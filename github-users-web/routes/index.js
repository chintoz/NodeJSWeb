var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { language : null, userName: null, errors: [] });
});

/* GET user query */
router.get("/user", function(req, res) {

  // Get userName from form  
  var userName = req.query.userName;

 if  (!userName || !userName.trim()) {
    res.render('index', { language : null, userName: null, errors: ['Empty User'] });
    return;
  } 
  userName = userName.trim();

  https.get({    
    host: 'api.github.com',
    headers: {'user-agent': 'Mozilla/5.0'},
    path: "/users/" +  encodeURI(userName) + "/repos"
  }, function(response) {
    
    var body = '';

    // On read data
    response.on('data', function(d) {
        body += d;
    });

    // On end read data
    response.on('end', function() {
        // Data reception is done, do whatever with it!
        var parsed = JSON.parse(body);

        // Check if user has repos
        if (!parsed.length) {
          res.render('index', { language : null, userName: null, errors: ['[' + userName + '] doesn\'t exist or doesn\'t have repositories' ] });
          return;
        }

        // Calculate preferred language
        var map = {};
        parsed.forEach(function (element) {
          if (element.language !== null) {
            if (!map[element.language]) {
              map[element.language] = 1;
            } else {
              map[element.language] = map[element.language] + 1;
            }
          }
        });

        // Initialize variables to discover most used language
        var maxValue = 0;
        var maxElement = [];

        // For each language used in each repo
        Object.keys(map).forEach(function(element){

          // First element is the first max value
          if (!maxElement) {
            maxElement= [element];
            maxValue = map[element];
          }

          // Same number of appereances then other favourite language
          if (maxValue === map[element]) {
            maxElement.push(element);
          }

          // If next element has more appereances change max value
          if (maxValue < map[element]) {
            maxValue = map[element];
            maxElement = [element];
          }
        });

        // Render again index page with the result of the query
        res.render('index', {userName: userName, language: maxElement, errors: [] });
    });
  })
  
})

module.exports = router;