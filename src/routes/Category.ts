import express from "express";
import controller from '../controllers/Category'
import Authentication from '../library/Authentication'

const router = express.Router();


router.post('/create', Authentication.userAuthenticate, controller.createCategory);
router.get('/get/:categoryId', controller.readCategory);
router.get('/get/', controller.readAll);
router.patch('/update/:categoryId', Authentication.adminAuthenticate, controller.updateCategory);
router.delete('/delete/:categoryId', Authentication.adminAuthenticate, controller.deleteCategory);

export = router;