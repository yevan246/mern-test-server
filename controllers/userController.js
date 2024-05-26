const UserService = require("../services/UserService");
const PostService = require("../services/PostService");

const signUp = async (req, res) => {
  const { email, username, password } = req.body;

  const result = await UserService.signup(email, username, password);
  res.json(result);
};

const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  const result = await UserService.login(emailOrUsername, password);
  res.json(result);
};

const getMe = async (req, res) => {
  const user = await UserService.getUserById(req.user._id, req.user._id)
  res.json({ user });
};

const getUsers = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const result = await UserService.getUsers(page, limit);
  res.json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id, req.user._id);
  res.json(result);
};

const getPostsByUserId = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { userId } = req.params;

  const posts = await PostService.getPostsByUserId(userId, req.user._id, +page, +limit);

  res.json(posts);
};

const uploadAvatar = async (req, res) => {
  await UserService.updateUserAvatar(req.user._id, req.file.filename);
  res.json({file: req.file.filename})
}

const followUser = async (req, res) => {
  const result = await UserService.followUser(req.user._id, req.params.id);
  res.json({result})
}

module.exports = {
  signUp,
  login,
  getMe,
  getUsers,
  getUserById,
  getPostsByUserId,
  uploadAvatar,
  followUser
};
