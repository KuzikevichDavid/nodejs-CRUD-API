import { Server } from "http";
import supertest from "supertest";
import { start } from "../../src/net/serverInstance";

describe('Scenario 4 - validate User fields', () => {
  const API = '/api/users';
  let app: Server;
  let testUser: { id?: string, username: string, age: number, hobbies: string[] };
  beforeAll(async () => {
    app = start();
    testUser = { username: 'Jack', age: 10, hobbies: ['haking', 'music'] };
    const response = await supertest(app)
      .post(API)
      .send(JSON.stringify(testUser));
    testUser = response.body;
  });
  afterAll(async () => {
    app.close();
  });

  it('should return 400 on wrong id format when get user', async () => {
    const id = 'wrong_id_format';

    const response = await supertest(app).get(`${API}/${id}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
  it('should return 400 on wrong id format when update user', async () => {
    const id = 'wrong_id_format';

    const response = await supertest(app)
      .put(`${API}/${id}`)
      .send(JSON.stringify({}));

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
  it('should return 400 on wrong id format when delete user', async () => {
    const id = 'wrong_id_format';

    const response = await supertest(app).delete(`${API}/${id}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
  it('should return 400 on incomplete body data when create user', async () => {
    const user = {
      username: 'Mary',
      hobbies: ['sport']
    };

    const response = await supertest(app).post(API)
      .send(JSON.stringify(user));

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
  it('should return 400 on invalid body data when create user', async () => {
    const user = 'invalid_data';

    const response = await supertest(app)
      .post(API)
      .send(JSON.stringify(user));

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
  it('should return 400 on invalid body data when update user', async () => {
    const user = 'invalid_data';

    const response = await supertest(app)
      .put(`${API}/${testUser.id}`)
      .send(JSON.stringify(user));

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
});