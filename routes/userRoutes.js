const router = require("express").Router()
const { signUp, login, getMe, getUsers, getUserById, getPostsByUserId, uploadAvatar, followUser } = require("../controllers/userController")
const tryCatchMiddleware = require('../middlewares/tryCatchMiddleware')
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/avatar");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = file.originalname.split(".").pop();
      cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
    },
  });
  
  const upload = multer({ storage: storage });

router.post('/signup', tryCatchMiddleware(signUp))
router.post('/login', tryCatchMiddleware(login))
router.post("/upload_avatar", upload.single("photo"), checkAuthMiddleware, tryCatchMiddleware(uploadAvatar));
router.get('/getMe', checkAuthMiddleware, tryCatchMiddleware(getMe))


router.get('/', checkAuthMiddleware, tryCatchMiddleware(getUsers))
router.get('/:id', checkAuthMiddleware, tryCatchMiddleware(getUserById))
router.post('/:id/follow', checkAuthMiddleware, tryCatchMiddleware(followUser))

router.get('/:userId/posts', checkAuthMiddleware, tryCatchMiddleware(getPostsByUserId))


module.exports = router
