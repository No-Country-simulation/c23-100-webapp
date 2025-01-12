import axios from 'axios';

describe('GET /api', () => {
  it('should return a 404 status', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(404);
  });
});
