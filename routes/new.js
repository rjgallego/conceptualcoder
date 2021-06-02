const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const newRouter = express.Router();
const mongoose = require('mongoose')

let Article = require('../models/Article');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const imgURL = 'https://conceptualcoder.s3-us-west-1.amazonaws.com/'

newRouter.post('/', upload.single("img"), (req, res) => {
    const date = new Date();
    const mm = String(date.getMonth()).padStart(2, '0');
    const dd = String(date.getDate() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const today = mm + "-" + dd + "-" + yyyy;

    const file = req.file;
    const body = req.body;
    
    let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey,
        region: "us-west-1"
    })

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    }

    s3bucket.upload(params, function(err, data){
        if(err){
            return res.status(500).json({error: true, Message: err});
        } else {
            console.log("Image uploaded")
            res.send({data});

            let articleInfo = {
                _id: new mongoose.Types.ObjectId(),
                title: body.title,
                img: data.Location,
                summary: body.description,
                topic: body.topic,
                body: body.firstParagraph,
                date: new Date()
            }
            const article = new Article(articleInfo);

            article.save(function(err, newArticle) {
                if(err){
                    console.log(err)
                } else {
                    console.log("New Article submitted")
                }
            })
        }
    })
});

newRouter.get("/", (req, res, next) => {
    Article.find().then(data => {
        res.status(200).json({
            message: "Article retrieved successfully!",
            article: data
        });
    });
});

module.exports = newRouter;