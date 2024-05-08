const router = require("express").Router();
const multer = require("multer");
const { uploadPhoto, createPost, deletePost, toggleLike, createComment } = require("../controllers/postController");
const checkAuthMiddleware = require("../middlewares/checkAuthMiddleware");
const tryCatchMiddleware = require('../middlewares/tryCatchMiddleware')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/posts");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", checkAuthMiddleware, tryCatchMiddleware(createPost));
router.delete("/:id", checkAuthMiddleware, tryCatchMiddleware(deletePost));
router.post("/upload_photo", upload.single("photo"), uploadPhoto);

router.post("/:postId/like", checkAuthMiddleware, tryCatchMiddleware(toggleLike));
router.post("/:postId/comment", checkAuthMiddleware, tryCatchMiddleware(createComment));

module.exports = router;
