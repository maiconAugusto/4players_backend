import Express from 'express';
import Routes from '../routes/index';

class Server {
  constructor() {
    this.server = Express();
    this.middleware();
    this.route();
  }

  middleware() {
    this.server.use(Express.urlencoded({ extended: true, limit: '50mb' }));
    this.server.use(Express.json());
  }

  route() {
    this.server.use(Routes);
  }
}
export default new Server().server;
