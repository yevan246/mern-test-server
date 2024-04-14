const PostService = require('../services/PostService')

const uploadPhoto = (req, res) => {
    res.json({file: req.file.filename})
}

const createPost = async (req, res) => {
    const {text, image} = req.body

    const post = await PostService.createPost(text, image, req.user._id)

    res.json({post})
}

const deletePost = async (req, res) => {
    const {id} = req.params
    const deletedPost = await PostService.deletePostById(id, req.user._id)
    if(deletedPost) {
        return res.json({message: 'Post deleted!'})
    }

    res.status(401).json({message: 'Dont do this, we know who you are!'})
} 


module.exports = {
    uploadPhoto,
    createPost,
    deletePost
}