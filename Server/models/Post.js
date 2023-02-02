const { Schema, model } = require("mongoose");
const dateFormat = require("../Utils/dateFormat");

const postSchema = new Schema({
  title: {
    type: string,
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
    String,
  },
  message: {
    type: string,
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
      username: {
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

const Post = model("Post", postSchema);

module.exports = Post;
