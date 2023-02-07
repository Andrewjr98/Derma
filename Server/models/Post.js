const { Schema, model } = require("mongoose");
const dateFormat = require("../Utils/dateFormat");

const PostSchema = new Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 36,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  message: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      commentAuthor: {
        type: String,
        required: true,
        trim: true,
      },
      comment: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 256,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Post = model("Post", PostSchema);

module.exports = Post;
