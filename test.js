var app = require('./app');
var Movie = require('./models/movieModel');
// var request = require('request');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

// Executed before each test case
describe('Movies', function () {
    beforeEach(function (done) {
        Movie.remove({}, function (err) {
            // console.log("before each executed");
            // console.log(err);
            done();
        });
    });

    describe('/', function () {
        describe('GET request on /', function () {
            it('it should return a json response with a message', function (done) {
                chai.request(app)
                    .get('/')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.be.eql({"message": "Welcome to our Movie Store"});
                        done();
                    });
            });
        });
    });

    describe('/GET movie', function () {
        describe('GET request on /movies', function () {
            it('it should get all the movies', function (done) {
                chai.request(app)
                    .get('/movies')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
    });

    describe('/POST movie', function () {
        describe('POST request on /movies', function () {
            it('it should not POST a movie without movies field', function (done) {
                var movie = {
                    "title": "movie6",
                    "releaseYear": "2017-06-06",
                    "director": "director6",
                    "genre": "genre6"
                };
                chai.request(app)
                    .post('/movies')
                    .send(movie)
                    .end(function (err, res) {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });

    describe('/GET/:id movie', function () {
        describe('GET request on /movies/:id', function () {
            it('it should GET a movie by the given id', function (done) {
                var movie = new Movie({
                    "title": "movie7",
                    "releaseYear": "2017-07-07",
                    "director": "director7",
                    "genre": "genre7"
                });
                movie.save(function (err, movie) {
                    chai.request(app)
                        .get('/movies/' + movie.id)
                        .send(movie)
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('title');
                            res.body.should.have.property('releaseYear');
                            res.body.should.have.property('director');
                            res.body.should.have.property('genre');
                            res.body.should.have.property('_id').eql(movie.id);
                            done();
                        });
                });
            });
        });
    });

    describe('/PUT/:id movie', function () {
        describe('PUT request on /movies/:id', function () {
            it('it should UPDATE a movie given by the id', function (done) {
                var movie = new Movie({
                    "title": "movie8",
                    "releaseYear": "2017-08-08",
                    "director": "director8",
                    "genre": "genre8"
                });
                movie.save(function (err, movie) {
                    chai.request(app)
                        .put('/movies/' + movie.id)
                        .send({"title": "movie8.1"})
                        .end(function (err, res) {
                            res.should.have.status(202);
                            res.body.should.be.a('object');
                            res.body.should.have.property('title').eql('movie8.1');
                            done();
                        });
                });
            });
        });
    });

    describe('/DELETE/:id movie', function () {
        describe('DELETE request on /movies/:id', function () {
            it('it should DELETE a movie given by the id', function (done) {
                var movie = new Movie({
                    "title": "movie9",
                    "releaseYear": "2017-09-09",
                    "director": "director9",
                    "genre": "genre9"
                });
                movie.save(function (err, movie) {
                    chai.request(app)
                        .delete('/movies/' + movie.id)
                        .end(function (err, res) {
                            res.should.have.status(204);
                            done();
                        });
                });
            });
        });
    });
});