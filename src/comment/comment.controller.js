import { response, request } from "express";
import Post from "../post/post.model.js";
import Comment from "./comment.model.js"

export const getComment = async (req = request, res = response) => {

    const { limit, from } = req.query;
    const query = { state: true };

    const [total, comments] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        comments
    });
}

export const createPost = async (req, res) => {

    const { postId , author, comment  } = req.body;
    try {
        const newComment = new Comment({ postId, author, comment });
       
        await newComment.save();

        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push(newComment);

        await post.save();

        res.status(201).json({ 
            newComment 
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating comment' });
    }
}

export const getCommentById = async (req, res) => {

    const { id } = req.params;
    const comments = await Comment.findOne({_id: id});

    res.status(200).json({
        comments
    });
}

export const updateComment = async (req, res) => {

    const { id } = req.params;
    const { _id, state, postId, ...rest} = req.body;

    await Comment.findByIdAndUpdate(id, rest);
    const comments = await Comment.findOne({_id: id});

    res.status(200).json({
        msg: 'Comment successfully updated',
        comments
    });
}

export const deleteComment = async (req, res) => {

    const { id } = req.params;
    
    await Comment.findByIdAndUpdate(id, { state: false });
    const comments = await Comment.findOne({ _id: id });

    res.status(200).json({
        msg: 'Comment successfully delete',
        comments
    });

}