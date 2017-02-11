var express = require('express');
var app = express();

app.use(express.static('public'));

require('./routes')(app);

// 404 error catcher
app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// unauthorized error catcher
app.use(function(err, req, res, next){
	if(err.name === 'UnauthorizedError'){
		res.status(401);
		res.json({"message": err.name + ": "+err.message});
	}
});

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
