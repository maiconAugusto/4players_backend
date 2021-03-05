import { Router } from 'express';

import AccountController from '../app/controllers/account';

const routes = new Router();

routes.get('/accounts', AccountController.index);
routes.post('/account', AccountController.store);
routes.get('/account/:id', AccountController.show);
routes.put('/account/:id', AccountController.update);
routes.delete('/account/:id', AccountController.remove);

export default routes;
