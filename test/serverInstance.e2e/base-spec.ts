import supertest from 'supertest';
import { start } from '../../src/net/serverInstance';
import { Server } from 'http';

describe("scenario 1 - base logic", () => {
  const API = '/api/users';
  let app: Server;
  let testUser: { id?: string, username: string, age: number, hobbies: string[] };
  beforeAll(async () => {
    app = start();
    testUser = { username: 'Jack', age: 10, hobbies: ['haking', 'music'] };
  });
  afterAll(async () => {
    app.close();
  });

  it('should return empty array', async () => {
    const expected = [];
    const response = await supertest(app).get(API);
    expect(response.body).toEqual(expected);
    expect(response.statusCode).toEqual(200);
  });
  it('should return created user with id', async () => {
    const requestBody = JSON.stringify(testUser);

    const response = await supertest(app)
      .post(API)
      .send(requestBody);

    expect(response.statusCode).toBe(201);
    expect(response.body.id).not.toBe('');
    testUser.id = response.body.id;
    expect(response.body).toEqual(testUser);
  });
  it('should return user by id', async () => {
    const response = await supertest(app).get(`${API}/${testUser.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(testUser);
  });
  it('should update user and return updated', async () => {
    testUser.username = 'Gary';
    testUser.hobbies = ['swim'];

    const response = await supertest(app)
      .put(`${API}/${testUser.id}`)
      .send(JSON.stringify(testUser));

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(testUser);
  });
  it('should delete user by id', async () => {
    const response = await supertest(app).delete(`${API}/${testUser.id}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual('');
  });
  it('should find no user', async () => {
    const response = await supertest(app).get(`${API}/${testUser.id}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined();
  });
});
