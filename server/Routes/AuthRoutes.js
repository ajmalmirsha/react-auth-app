const { register, login, admin, AdminLogin, deleteUser, editUser, uploadImage } = require('../Controllers/AuthControllers')
const { checkUser } = require('../Middlewares/AuthMiddlewares')
const { uploadOptions } = require('../Middlewares/multer')


const multer = require('multer')
const upload = multer({ dest: '../uploads/'})

const router = require('express').Router()
const data ='uuu'
router.post('/',checkUser)
router.post('/register',register)
router.post('/login',login)
router.get('/admin',admin)
router.post('/adminlogin',AdminLogin)
router.delete('/admin/delete-user/:id',deleteUser)
router.post('/edit-user',editUser)
router.post('/upload-image',uploadOptions.single('image'),uploadImage)

module.exports = router
