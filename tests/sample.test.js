const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

beforeAll(done => {
  done();
});

afterAll(done => {
  done();
  server = app.listen();
  server.close();
});

describe('With given urls', () => {
  it('should test that business id is invalid', async () => {

    const response = await request.get('/api/company/2532004');

    expect(response.status).toBe(400);

  });

  it('should not found', async () => {

    const response = await request.get('/');

    expect(response.status).toBe(404);
  });

  it('should get company data', async () => {

    const response = await request.get('/api/company/2532004-3');

    expect(response.status).toBe(200);
  });
  
});



