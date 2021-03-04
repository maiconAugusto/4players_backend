import Express from 'express';
import Routes from '../routes/index';
import Database from '../database/index';

class Server {
  constructor() {
    this.server = Express();
    this.ConnectionDatabse();
    this.middleware();
    this.route();
  }

  async ConnectionDatabse() {
    await Database;
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
