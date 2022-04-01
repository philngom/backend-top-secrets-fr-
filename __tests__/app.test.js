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
  await agent.post('/api/v1/users/sessions').send({ email, password });
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

  it('returns the current user', async () => {
    const [agent, user] = await registerAndLogin();
    const me = await agent.get('/api/v1/users/me');
    expect(me.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number)
    });
  });

  it('should create a new secret', async () => {
    const [agent] = await registerAndLogin();



    let res = await agent.post('/api/v1/secrets').send({
      title: 'definition of secret',
      description: 'to be kept from knowledge or view'
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'definition of secret',
      description: 'to be kept from knowledge or view',
      createdAt: expect.any(String)
    });

    res = await request(app).post('/api/v1/secrets').send({
      title: 'definition of secret',
      description: 'to be kept from knowledge or view'
    });

    expect(res.body).toEqual({ message: 'You must be signed in to continue', status: 401 });
  });

  it('should be able to view secrets when signed in', async () => {
    const [agent] = await registerAndLogin();

    await agent.post('/api/v1/secrets').send({
      title: 'definition of secret',
      description: 'to be kept from knowledge or view'
    });

    const res = await agent.get('/api/v1/secrets');

    expect(res.body).toEqual([{
      id: expect.any(String),
      title: 'definition of secret',
      description: 'to be kept from knowledge or view',
      createdAt: expect.any(String)
    }]);

  });
});

