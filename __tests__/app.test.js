const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-top-secrets-fr routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a user', async () => {
    const res = request(app).post('/api/v1/users').send({
      firstName: 'Jim',
      lastName: 'Burton',
      email: 'jb@defense.gov'
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName: 'Jim',
      lastName: 'Burton',
      email: 'jb@defense.gov'
    })
  })
});
