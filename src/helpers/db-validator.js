import Post from '../post/post.model.js';

export const existsPostById = async (id = '') => {
    const existsPost = await Post.findById(id);
    
    if(!existsPost){
        throw new Error(`The post with ID: ${id} does not exist`);
    }
}