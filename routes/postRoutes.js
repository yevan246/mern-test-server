const router = require('express').Router()
const multer = require('multer')
const {uploadPhoto, createPost} = require('../controllers/postController')
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/posts')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = file.originalname.split('.').pop()
      cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
    }
  })
  
  const upload = multer({ storage: storage })


router.post('/', checkAuthMiddleware, createPost)
router.post('/upload_photo', upload.single('photo'), uploadPhoto)

module.exports = router

