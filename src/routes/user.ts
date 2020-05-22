import * as UserController from '../controllers/UserController';
import { Router } from 'express';

const routesUser: Router = Router();
routesUser.get('/users', UserController.getListOfUsers);
routesUser.get('/users/:userId', UserController.getDetails);
routesUser.post('/users', UserController.addUser);
routesUser.put('/users/:userId', UserController.updateUser);
routesUser.delete('/users/:userId', UserController.deleteUser);

export default routesUser;