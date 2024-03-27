const PostService = require('../services/PostService')

const uploadPhoto = (req, res) => {
    res.json({file: req.file.filename})
}

const createPost = async (req, res) => {
    const {text, image} = req.body

    const post = await PostService.createPost(text, image, req.user._id)

    res.json({post})
}


module.exports = {
    uploadPhoto,
    createPost
}