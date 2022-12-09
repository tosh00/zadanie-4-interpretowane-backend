import express from 'express';
import controller from '../controllers/User'
import Authentication from '../library/Authentication'

const router = express.Router();
router.post('/registration', controller.createUser);
router.post('/refresh', controller.getUserToken);
router.get('/get/:userId',Authentication.userAuthenticate , controller.readUser);
router.get('/get/',Authentication.adminAuthenticate , controller.readAll);
router.patch('/update/:userId',Authentication.userAuthenticate , controller.updateUser);
router.delete('/delete/:userId',Authentication.userAuthenticate , controller.deleteUser);

router.post('/login', controller.loginUser);

export = router;