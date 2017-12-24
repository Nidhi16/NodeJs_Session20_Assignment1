var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Movie = require('./models/movieModel');

var dbName='movieDB';

var connectionString='mongodb://localhost:27017/'+dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
   res.status(200).json({message: "Welcome to our Movie Store"});
});

app.get('/movies', function (req, res) {
    console.log("-------- default get request");
    Movie.find(function(err,movies){
        if(err)
            res.send(err);
        res.status(200).json(movies);
    });
});

app.post('/movies', function (req, res) {
    console.log("------POST------", req.body);
    var movie=new Movie(req.body);
    movie.save(function(err, data){
        if(err)
            res.send(err);
        res.status(201).json(data);
    });
});

app.put('/movies/:id', function (req, res) {
    console.log("----PUT-----");
    Movie.findOne({_id:req.params.id},function(err,movie){

        if(err)
            res.send(err);

        for(prop in req.body){
            movie[prop]=req.body[prop];
        }

        // save the movie
        movie.save(function(err, data) {
            if (err)
                res.send(err);

            res.status(202).json(data);
        });

    });
});

app.get('/movies/:id', function (req, res) {
    console.log("---ID----- get request", req.params);
    Movie.findOne({_id:req.params.id},function(err, movie) {
        if(err)
            res.send(err);

        res.status(200).json(movie);
    });
});

app.delete('/movies/:id', function (req, res) {
    console.log("-----DELETE---  request");
    Movie.remove({
        _id: req.params.id
    }, function(err, movie) {
        if (err)
            res.send(err);

        res.sendStatus(204);
    });
});

app.listen(8000, function () {
    console.log("Listening to the port: 8000");
});

module.exports = app;
