const express = require('express');
const articleRouter = express.Router();

let Article = require('../models/Article');

/* GET all articles from the database */
const getArticle = function(id, done) {
  Article.findById(id, function(err, data){
    if(err) console.log(err)
    else done(null, data)
  })
}


articleRouter.get('/:id', function(req, res){
  const id = req.params.id;
  getArticle(id, function(err, data){
    if(err) console.log(err)
    else{
      res.send(data);
    }
  })
})

module.exports = articleRouter;
