const supertest = require('supertest');
const app = require('../src/routes');

const request = supertest(app);

test('testar se servidor está on', () => {
  const response = request.get('/').then((resp) => {
    expect(resp.status).toEqual(200);
  });
  return response;
});
