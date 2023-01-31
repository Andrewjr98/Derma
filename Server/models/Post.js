const { Schema, model } = require('mongoose');
const dateFormat = require('../Utils/dateFormat');

const postSchema = new Schema({
    postMessage: {
        type: String,
        required: 'Why are you posting nothing?',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    postAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 256,
            },
            createdAt:{
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
});

const Post = model('Post', postSchema);

module.exports = Post;