import { Router } from 'express';
import routesUser from './user';

const routes: Router = Router();
routes.use(routesUser);

export default routes;