const User = require("../models/userModel");
const Post = require("../models/postModel");
const PostLikes = require("../models/likesForPostsModel");
const ObjectId = require("mongodb").ObjectId;

class PostService {
  async createPost(text, image, userId) {
    const post = await Post.create({
      text,
      image,
      user: userId,
    });
    await post.populate("user", "username avatar");

    return post;
  }

  async getPostsByUserId(userId, currentUserId, page, limit) {
    // return await Post.find({ user: userId })
    //   .skip((page - 1) * limit)
    //   .limit(limit)
    //   .populate("user", "username avatar")
    //   .sort({ _id: -1 })
    //   .lean();
    const aggregation = [
      {
        $match: { user: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          "user.password": 0,
          "user.email": 0,
          "user.createdAt": 0,
          "user.updatedAt": 0,
        },
      },
      {
        $lookup: {
          from: "postlikes",
          localField: "_id",
          foreignField: "post",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
          likedByCurrentUser: { $in: [currentUserId, "$likes.user"] },
        },
      },
      {
        $project: { likes: 0 },
      },
      { $sort: { _id: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];
    const res = await Post.aggregate(aggregation);
    return res;
  }

  async deletePostById(id, userId) {
    return await Post.findOneAndDelete({ _id: id, user: userId });
  }

  async toggleLike(userId, postId) {
    const postLike = await PostLikes.findOne({
      user: userId,
      post: postId,
    }).lean();

    if (postLike) {
      await PostLikes.findByIdAndDelete(postLike._id);
      return { userLiked: false };
    }

    await PostLikes.create({ user: userId, post: postId });
    return { userLiked: true };
  }
}

module.exports = new PostService();
