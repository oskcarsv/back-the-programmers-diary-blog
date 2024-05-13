import { response, request } from "express";
import Post from "./post.model.js";

export const getPost = async (req = request, res = response) => {
    const { limit, from } = req.query;
    const query = { state: true };

    try {
        const [total, post] = await Promise.all([
            Post.countDocuments(query),
            Post.find(query)
                .populate("author", "name")
                .skip(Number(from))
                .limit(Number(limit)),
        ]);

        res.status(200).json({
            total,
            posts
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving posts' });
    }
};

export const createPost = async (req, res) => {

    const { author, title, content, img } = req.body;

    try {
        const post = new Post({ author, title, content, img });
        await post.save();

        res.status(201).json({
            post
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post' });
    }
}

export const getPostById = async (req, res) => {

    const { id } = req.params;
    const post = await Post.findOne({ _id: id });

    res.status(200).json({
        post
    })
}

export const updatePost = async (req, res) => {

    const { id } = req.params;
    const { _id, state, ...rest } = req.body;

    await Post.findByIdAndUpdate(id, rest);
    const post = await Post.findOne({ _id: id });

    res.status(200).json({
        msg: 'Post successfully updated',
        post
    });
}

export const deletePost = async (req, res) => {

    const { id } = req.params;

    await Post.findByIdAndUpdate(id, { state: false });
    const post = await Post.findOne({ _id: id });

    res.status(200).json({
        msg: 'Post successfully deleted',
        post
    });
}