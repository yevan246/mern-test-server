const User = require("../models/userModel");
const Post = require("../models/postModel");
const PostLikes = require("../models/likesForPostsModel");
const ObjectId = require("mongodb").ObjectId;
const PostComment = require("../models/postCommentModel");

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
      {
        $lookup: {
          from: "postcomments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.user",
          foreignField: "_id",
          as: "commentUsers",
        },
      },
      {
        $addFields: {
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                $mergeObjects: [
                  "$$comment",
                  {
                    user: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$commentUsers",
                            as: "user",
                            cond: { $eq: ["$$user._id", "$$comment.user"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          comments: {
            $sortArray: {
              input: "$comments",
              sortBy: { createdAt: -1 }
            }
          }
        }
      },
      {
        $project: {
          commentUsers: 0,
          "comments.user.password": 0,
          "comments.user.email": 0,
          "comments.user.createdAt": 0,
          "comments.user.updatedAt": 0,
        },
      },
      { $sort: { _id: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];
    // const users = [{...}]
    // let comments = [{...}]
    // comments = comments.map(comment => {
    //   return {...comment, user: users.filter(user => user._id === comment.user)[0] }
    // })
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

    const likesCount = await PostLikes.countDocuments({ post: postId });

    if (postLike) {
      await PostLikes.findByIdAndDelete(postLike._id);
      return { postId, likedByCurrentUser: false, likesCount: likesCount - 1 };
    }

    await PostLikes.create({ user: userId, post: postId });
    return { postId, likedByCurrentUser: true, likesCount: likesCount + 1 };
  }

  async createComment(userId, postId, text) {
    return (await PostComment.create({ text, post: postId, user: userId })).populate('user', 'username avatar createdAt');
  }
}

module.exports = new PostService();
