const express = require('express');
const indexRouter = express.Router();

let Article = require('../models/Article');

const findAllArticles = function(done) {
  Article.find({}, function(err, data){
    if(err) console.log(err)
    else done(null, data)
  })
}

const findFilteredArticles = function(filter, done){
  Article.find({topic : filter}, function(err, data){
    if(err) console.log(err);
    else done(null, data);
  })
}

indexRouter.get('/all', function(req, res){
  findAllArticles(function(err, data){
    if(err) res.send(err)
    else{
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.send(data);
    }
  })
});

indexRouter.get('/:filter', function(req, res){
  const filter = req.params.filter;
  findFilteredArticles(filter, function(err, data){
    if(err) res.send(err)
    else res.send(data);
  })
})

module.exports = indexRouter;
