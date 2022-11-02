import express from "express";
import controller from '../controllers/Category'

const router = express.Router();

router.post('/create', controller.createCategory);
router.get('/get/:categoryId', controller.readCategory);
router.get('/get/', controller.readAll);
router.patch('/update/:categoryId', controller.updateCategory);
router.delete('/delete/:categoryId', controller.deleteCategory);

export = router;