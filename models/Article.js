const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    img: String,
    summary: String,
    topic: String,
    body: String,
    date: Date
}, {
    collection: 'articles'
})

module.exports = mongoose.model('Article', articleSchema);