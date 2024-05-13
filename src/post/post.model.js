'use strict';

import { Schema, model } from "mongoose";

const PostSchema = Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, "The user id is required"],
  },
  title: {
    type: String,
    required: [true, "The title is required"],
  },
  content: {
    type: String,
    required: [true, "The content is required"],
  },
  img: {
    type: String,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  estado: {
    type: Boolean,
    default: true,
  },
});


export default model('Post', PostSchema);
