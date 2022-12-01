import express from 'express';
import controller from '../controllers/User'
import Authentication from '../library/Authentication'


const router = express.Router();
router.post('/registration', controller.createUser);
router.get('/get/:userId',Authentication.adminAuthenticate , controller.readUser);
router.get('/get/',Authentication.adminAuthenticate , controller.readAll);
router.patch('/update/:userId',Authentication.adminAuthenticate , controller.updateUser);
router.delete('/delete/:userId',Authentication.adminAuthenticate , controller.deleteUser);

router.post('/login', controller.loginUser);

export = router;