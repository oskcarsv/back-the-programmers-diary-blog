import { response, request } from "express";
import Post from "./post.model.js";

export const getPost = async (req = request, res = response) => {
    
    const { limit, from } = req.query;
    const query = { status: true };

    try {
        const [total, posts] = await Promise.all([
            Post.countDocuments(query),
            Post.find(query)
                .skip(Number(from))
                .limit(Number(limit))
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
    const { author, title, content, img, pin } = req.body;

    const correctPin = "1234";

    if (pin !== correctPin) {
        return res.status(403).json({ message: 'Incorrect pin' });
    }

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

    const { id } = req.body;
    const post = await Post.findOne({ _id: id });

    res.status(200).json({
        post
    })
}

export const updatePost = async (req, res) => {

    const { id, _id, state, ...rest } = req.body;

    await Post.findByIdAndUpdate(id, rest);
    const post = await Post.findOne({ _id: id });

    res.status(200).json({
        msg: 'Post successfully updated',
        post
    });
}

export const deletePost = async (req, res) => {

    const { id } = req.body;

    await Post.findByIdAndUpdate(id, { state: false });
    const post = await Post.findOne({ _id: id });

    res.status(200).json({
        msg: 'Post successfully deleted',
        post
    });
}