import { Router } from 'express';

import AccountController from '../app/controllers/account';

const routes = new Router();

routes.get('/accounts', AccountController.index);
routes.get('/account', AccountController.show);
routes.put('/account', AccountController.update);
routes.delete('/account', AccountController.remove);

export default routes;
