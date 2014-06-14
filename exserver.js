var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var occupations = ['Actor', 'Teacher', 'Store Manager'];
var orderOccu = occupations.slice(0);
var hobbies = ['Acting', 'Teaching', 'Fishing', 'Playing with my kids'];
var orderHobbies = hobbies.slice(0);
var friends = ['Adam', 'Josh', 'Gary'];
var mentions = ['http://jonliddiard.com/', 'http://www.deseretnews.com/article/865560855/Jayne-Luke-shines-in-Arsenic-and-Old-Lace.html?pg=all']
var skills = [
	{
	  id: 1,
	  name: 'Javascript',
	  experience: 'Intermediate'
	},
	{
	  id: 2,
	  name: 'Acting',
	  experience: 'Advanced'
	},
];

app.use(bodyParser());

app.get('/name', function(req, res){
  res.send({'name': 'Jon Liddiard'});
});

app.get('/location', function(req, res){
  res.send({'location': 'The coolest place on Earth. Which is not cold... it is hot'});
});

app.get('/hobbies', function(req, res){
  	if (req.query.order === "desc"){
		res.send({'hobbies': orderHobbies.sort()});
  	} else if (req.query.order === "asc"){
  		res.send({'hobbies': orderHobbies.sort().reverse()});
  	} else {
		res.send({'hobbies': hobbies});
  	}
});

app.get('/occupations', function(req, res){
	if (req.query.order === "desc"){
		res.send({'occupations': orderOccu.sort()});
  	} else if (req.query.order === "asc"){
  		res.send({'occupations': orderOccu.sort().reverse()});
  	} else {
  	res.send({'occupations': occupations});
    }
});

app.get('/occupations/latest', function(req, res){
  res.send({'latest': occupations[occupations.length - 1]});
});

app.route('/friends')
	.get(function(req, res){
	  res.send(friends);
	})
	.post(function(req, res){
	  friends.push(req.body.friend);
	  res.send(friends);
	})

app.route('/mentions')
	.get(function(req, res){
	  res.send(mentions);
	})
	.post(function(req, res){
	  mentions.push(req.body.urls);
	  res.send(mentions);
	})

app.route('/skills')
	.get(function(req, res){
	  res.send(skills);
	})
	.post(function(req, res){
	  skills.push(req.body.skill);
	  res.send(skills);
	})

app.get('/skills/:id', function(req, res){
  var id = req.params.id;
  for(var i = 0; i < skills.length; i++){
    if(skills[i].id === parseInt(id)){
      res.send({skills: skills[i]});
    }
  }
});

app.put('/skills/:id', function(req, res){
  var id = req.params.id;
  for(var i = 0; i < skills.length; i++){
    if(skills[i].id === parseInt(id)){
      skills[i] = req.body;
    }
  }
  res.send({skills: skills});
});

app.delete('/skills/:id', function(req, res){
  var id = req.params.id;
  for(var i = 0; i < skills.length; i++){
    if(skills[i].id === parseInt(id)){
      skills.splice(i, 1);
    }
  }
  res.send({skills: skills});
});



app.listen(8800);