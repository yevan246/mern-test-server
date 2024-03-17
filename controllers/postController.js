const Post = require('../models/postModel')

const uploadPhoto = (req, res) => {
    console.log(req.file);

    res.json({file: req.file.filename})
}

const createPost = async (req, res) => {
    const {text, image} = req.body
    const {_id: userId} = req.user

    const post = await Post.create({
        text, image, user: userId
    })

    res.json({post})
}


module.exports = {
    uploadPhoto,
    createPost
}