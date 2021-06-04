const express = require('express');
const articleRouter = express.Router();

let Article = require('../models/Article');

const getArticle = function(id, done) {
  Article.findById(id, function(err, data){
    if(err) res.send(err)
    else done(null, data)
  })
}


articleRouter.get('/:id', function(req, res){
  const id = req.params.id;
  getArticle(id, function(err, data){
    if(err) res.send(err)
    else{
      res.send(data);
    }
  })
})

module.exports = articleRouter;
