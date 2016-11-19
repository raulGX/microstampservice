const express = require('express'),
	app = express(),
	port = process.env.port	|| 8000,
	path = require('path');

var rootPath = path.normalize(__dirname + '/view')

app.use(express.static(rootPath));

app.get('/:id', function(req, res){
	var date;
	if (isNaN(req.params.id)){
		date = new Date(req.params.id);
	}
	else{
		date = new Date(+req.params.id);
	}
	if (isNaN(date.getTime()))
		res.send({
			"natural:": null,
			"unix": null
		});
	else
		res.send({
			"natural:": date.toDateString(),
			"unix": date.getTime()
		});
});

app.listen(port, function(err){
	if (err){
		console.log(err);
		process.exit(1);
	}
	console.log("Listening to port:", port);
});
