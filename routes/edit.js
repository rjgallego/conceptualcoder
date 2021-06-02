const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const editRouter = express.Router();
const path = require('path');

let Article = require('../models/Article');

editRouter.put('/', (req, res, next) => {
    const date = new Date();
    const mm = String(date.getMonth()).padStart(2, '0');
    const dd = String(date.getDate() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const today = mm + "-" + dd + "-" + yyyy;
    console.log(req.body)

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
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = editRouter;