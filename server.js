var express = require('express');
var bodyParser = require('body-parser');
var port = 8834;
var app = express();

var me = {
	name: 'Jason',
	location: 'Provo, UT',
	hobbies: [
		'programming',
		'music',
		'reading',
		'video games'
		],
	occupations: [
		'Web Developer',
		'Rockstar',
		'Chief Information Officer',
		'Database Developer',
		'Nuclear Physics Instructor'
		],
	mentions: [
		'http://example.com'
		],
	references: [
		'Ken',
		'Steve',
		'Strong Bad'
		],
	skills: [{
			id: 1,
			name: 'Angularjs',
			experience: 'Novice'
		},
		{
			id: 2,
			name: 'Javascript',
			experience: 'Intermediate'
		},
		{
			id: 3,
			name: 'HTML',
			experience: 'Intermediate'
		},
		{
			id: 4,
			name: 'CSS',
			experience: 'Intermediate'
		},
		{
			id: 5,
			name: 'Nunchaku',
			experience: 'Advanced'
		}]
}

app.use(bodyParser());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT');
	next();
})

app.get('/allInfo', function(req, res) {
	res.status(200).json(me);
})

app.get('/name', function(req, res) {
	res.status(200).json(me.name);
})

app.get('/location', function(req, res) {
	res.status(200).json(me.location);
})

app.put('/location', function(req, res) {
	console.log(req.body);
	if (req.body) {
		me.location = req.body.location;
		console.log('Changed location to: ');
		console.log(me.location);
		res.status(200).json(me.location);
	} else {
		res.status(400).send('Bad Request');
	}
})

app.get('/hobbies', function(req, res) {
	if (req.query.order === 'asc') {
		res.status(200).json(me.hobbies.reverse());
	} else {
		res.status(200).json(me.hobbies);
	}
})

app.get('/occupations', function(req, res) {
	if (req.query.order === 'asc') {
		res.status(200).json(me.occupations.reverse());
	} else {
		res.status(200).json(me.occupations);
	}
})

app.get('/occupations/latest', function(req, res) {
	res.status(200).json(me.occupations[me.occupations.length]);
})

app.get('/mentions', function(req, res) {
	res.status(200).json(me.mentions);
})

app.post('/mentions', function(req, res) {
	if (req.body) {
		console.log('POST to mentions: ' + req.body.mention);
		me.mentions.push(req.body.mention);
		res.status(200).json(me.mentions);
	} else {
		res.status(400).send('Bad Request')
	}
})

app.get('/references', function(req, res) {
	res.status(200).json(me.references);
})

app.post('/references', function(req, res) {
	if (req.body) {
		console.log('POST to references: ' + req.body);
		me.references.push(req.body);
		res.status(200).json(me.references);
	} else {
		res.status(400).send('Bad Request');
	}
})

app.get('/skills', function(req, res) {
	if (req.query.experience) {
		var sendSkills = [];
		for (var i = 0; i < me.skills.length; i++) {
			if (me.skills[i].experience === req.query.experience) {
				sendSkills.push(me.skills[i]);
			}
		}
			res.status(200).json(me.sendSkills);
		} else {
			res.status(200).json(me.skills);
	}
})

app.post('/skills', function(req, res) {
	if (req.body) {
		console.log('POST to skills: ' + req.body);
		me.skills.push(req.body);
		res.json(me.skills);
	} else {
		res.status(400).send('Bad Request');
	}
})


app.listen(port);
console.log('Listening on port ' + port);