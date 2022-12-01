import express from 'express';
import controller from '../controllers/Product'
import Authentication from '../library/Authentication'

const router = express.Router();
router.post('/create', Authentication.adminAuthenticate, controller.createProduct);
router.get('/get/:productId', controller.readProduct);
router.get('/get/', controller.readAll);
router.patch('/update/:productId', Authentication.adminAuthenticate, controller.updateProduct);
router.delete('/delete/:productId', Authentication.adminAuthenticate, controller.deleteProduct);

export = router;