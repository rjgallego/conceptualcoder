const express = require('express');
const deleteRouter = express.Router();

let Article = require('../models/Article');

/* GET all articles from the database */
const deleteArticle = function(id, done) {
  Article.findOneAndDelete({_id: id}, function(err, data){
    if(err) console.log(err)
    else done(null, data)
  })
}


deleteRouter.get('/:id', function(req, res){
  const id = req.params.id;
  deleteArticle(id, function(err, data){
    if(err) console.log(err)
    else{
      res.send(data);
    }
  })
})

module.exports = deleteRouter;