const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Jim',
  lastName: 'Burton',
  email: 'jb@defense.gov',
  password: '123456'
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  const agent = request.agent(app);

  const user = await UserService.create({ ...mockUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/session').send({ email, password });
  return [agent, user];
};

describe('backend-top-secrets-fr routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName: 'Jim',
      lastName: 'Burton',
      email: 'jb@defense.gov',
    });
  });

  it.only('returns the current user', async () => {
    const [agent, user] = await registerAndLogin();
    const me = await agent.get('/api/v1/users/me');

    expect(me.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number)
    });
  });
});
