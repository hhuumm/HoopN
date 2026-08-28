// @vitest-environment node
const request = require('supertest');
const app = require('../app');

describe('HoopN API', () => {
  it('reports its health', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ service: 'hoopn', status: 'ok' });
  });

  it('returns JSON for unknown API routes', async () => {
    const response = await request(app).get('/api/not-a-route');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('API route not found');
  });

  it('fails closed for malformed authorization headers', async () => {
    const response = await request(app).get('/api/users').set('Authorization', 'Basic abc123');
    expect(response.status).toBe(401);
  });

  it('describes the unavailable password-reset capability honestly', async () => {
    const response = await request(app).post('/api/auth/reset-password').send({ email: 'player@example.com' });
    expect(response.status).toBe(501);
    expect(response.body.error).toMatch(/not configured/i);
  });
});
