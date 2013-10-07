
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var url = require('url');
var GA = require('googleanalytics');
 util = require('util');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/GetAnalyticReport' , function(req, res){

var username = req.query.username;
var password  = req.query.password;
var tableID= req.query.tableID;
var endDate = '2012-08-30';

var startDate = '2011-09-01';

	config = {
        "user": username,
        "password": password
    },
    ga = new GA.GA(config);
console.log(startDate);

	ga.login(function(err, token) {

		var options = {
			'ids': 'ga:'+tableID,
			'start-date': startDate,
			'end-date': endDate,
			'dimensions': 'ga:pagePath',
			'metrics': 'ga:pageviews',
			'sort': '-ga:pagePath'
		};

		ga.get(options, function(err, entries) {
	
			var result = JSON.stringify(entries);
			res.setHeader('Content-Type' , 'application/json');
			res.setHeader('Content-Length' , result.length);
			res.end(result);
	   //res.send(JSON.stringify(entries));
	   //res.end();
		});
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

