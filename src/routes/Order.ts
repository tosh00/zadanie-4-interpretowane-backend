import express from 'express';
import controller from '../controllers/Order'
const router = express.Router();
router.post('/create', controller.createOrder);
router.get('/get/:orderId', controller.readOrder);
router.get('/get/', controller.readAll);
router.patch('/update/:orderId', controller.updateOrder);
router.delete('/delete/:orderId', controller.deleteOrder);
export = router;