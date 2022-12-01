import express from 'express';
import controller from '../controllers/Order'
import Authentication from '../library/Authentication'

const router = express.Router();

router.post('/create', Authentication.userAuthenticate, controller.createOrder);
router.get('/get/:orderId', Authentication.adminAuthenticate, controller.readOrder);
router.get('/get/', Authentication.adminAuthenticate, controller.readAll);
router.patch('/update/:orderId', Authentication.adminAuthenticate, controller.updateOrder);
router.delete('/delete/:orderId', Authentication.adminAuthenticate, controller.deleteOrder);

export = router;