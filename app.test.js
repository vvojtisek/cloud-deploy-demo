const request = require('supertest');
const app = require('./app');
const packageVersion = require('./package.json').version;

describe('Application Endpoints', () => {
  it('GET / should return current version', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toContain(`Version: ${packageVersion}`);
  });

  it('GET /health should return 200 healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('healthy');
  });
});
