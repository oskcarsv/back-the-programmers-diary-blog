import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Comment", commentSchema);
