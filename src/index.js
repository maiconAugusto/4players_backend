import App from './server/index';

require('dotenv').config();

App.listen(process.env.PORT);
