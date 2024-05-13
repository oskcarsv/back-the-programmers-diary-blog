
import mongoose, { Schema } from 'mongoose';

const PostSchema = mongoose.Schema({
  author: {
    type: String,
    required: [true, "The author id is required"],
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
  status: {
    type: Boolean,
    default: true,
  },
});


export default mongoose.model('Post', PostSchema);
