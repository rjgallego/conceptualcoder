const express = require('express');
const editRouter = express.Router();

let Article = require('../models/Article');

editRouter.put('/', (req, res) => {
    const filter = {
        _id: req.body.id
    }

    const update = {
        title: req.body.title,
        summary: req.body.description,
        topic: req.body.topic,
        body: req.body.firstParagraph,
    }

    Article.findOneAndUpdate(filter, update, {new: true}).then(result => {
        res.status(201).json({
            message: "File updated successfully!",
            article: result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = editRouter;