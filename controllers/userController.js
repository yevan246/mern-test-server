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

const getMe = (req, res) => {
  res.json({ user: req.user });
};

const getUsers = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const result = await UserService.getUsers(page, limit);
  res.json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id);
  res.json(result);
};

const getPostsByUserId = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { userId } = req.params;

  const posts = await PostService.getPostsByUserId(userId, page, limit);

  res.json(posts);
};

const uploadAvatar = async (req, res) => {
  await UserService.updateUserAvatar(req.user._id, req.file.filename);
  res.json({file: req.file.filename})
}

module.exports = {
  signUp,
  login,
  getMe,
  getUsers,
  getUserById,
  getPostsByUserId,
  uploadAvatar
};
