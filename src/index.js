import App from './server/index';

require('dotenv').config();

App.listen(8080, () => {
  console.log('run');
});
