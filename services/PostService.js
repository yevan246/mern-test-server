const User = require("../models/userModel");
const Post = require("../models/postModel");

class PostService {
  async createPost(text, image, userId) {
    const post = await Post.create({
      text,
      image,
      user: userId,
    });
    await post.populate('user', "username avatar")

    return post;
  }

  async getPostsByUserId(userId, page, limit) {
    return await Post.find({ user: userId })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "username avatar")
      .sort({ _id: -1 })
      .lean();
  }

  async deletePostById(id, userId) {
    return await Post.findOneAndDelete({_id: id, user: userId}) 
  }
}

module.exports = new PostService();
