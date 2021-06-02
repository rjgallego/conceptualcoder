
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let fs = require('fs');

let Article = require('../models/Article');

chai.use(chaiHttp);

let title;
let id;

describe('/GET articles', function () {
    it('it should GET all articles', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                if(err) console.log(err);

                res.should.have.status(200);
                res.body.should.be.a('array');

                done();
            })
    })
});

describe('/POST article', function () {
    it('it should POST a new article to the database', (done) => {
        chai.request(server)
            .post('/new')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('title', "Title")
            .field("topic", "Java")
            .field("fileName", "elysianpark.jpg")
            .field("description", "Article description")
            .field("firstParagraph", "Article first paragraph")
            .attach('img', fs.readFileSync('C:\\Users\\galle\\Pictures\\elysianpark.jpg'), 'elysianpark.jpg')
            .end((err, res) => {
                if(err) console.log(err);

                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("File uploaded successfully!");
                res.body.should.have.property('imageCreated');

                id = res.body.imageCreated._id;
                title = res.body.imageCreated.title;

                done();
            })
    })

    //Replacing with Delete functionality test

    // after(function(done){
    //     Article.deleteOne({_id: id}, function(err, result) {
    //         if(err) console.log(err);
    //         else console.log("Removed article " + id);

    //         done();
    //     })
    // })
});

describe('/GET article', function() {
    it('should return the article by title', done => {
        chai.request(server)
            .get(`/article/${title}`)
            .end((err, res) => {
                if(err) console.log(err);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('title').eql('Title');
                res.body.should.have.property('img');
                res.body.should.have.property('summary');
                res.body.should.have.property('body');
                res.body.should.have.property('date');

                done();
            });
    })
})

describe('/DELETE article', function() {
    it('should delete the article with the passed title', done => {
        chai.request(server)
            .get(`/delete/${title}`)
            .end((err, res) => {
                if(err) console.log(err);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('title').eql('Title');
                res.body.should.have.property('img');
                res.body.should.have.property('summary');
                res.body.should.have.property('body');
                res.body.should.have.property('date');

                done();
            })
    })

    it('should return an empty object after article is deleted', done => {
        chai.request(server)
            .get(`/article/${title}`)
            .end((err, res) => {
                if(err) console.log(err);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.empty;

                done();
            })
    })
})