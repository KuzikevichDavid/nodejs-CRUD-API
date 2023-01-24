import { Server } from "http";
import supertest from "supertest";
import { start } from "../../src/net/serverInstance";
import { User } from "../../src/repositories/entities/user";

const API = '/api/users';

describe('Scenario 2 - operations with not exists user', () => {
  let app: Server;
  let testUser: User;
  beforeAll(async () => {
    app = start();
    testUser = new User('d8a4ecdd-0a48-4c2b-9454-1c7accb72cd0', 'Jack', 10, ['haking', 'music']);
  });
  afterAll(async () => {
    app.close();
  });

  it('should return 404 on find non-exist user', async () => {
    const response = await supertest(app).get(`${API}/${testUser.id}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined();
  });
  it('should return 404 on update non-exist user', async () => {
    const response = await supertest(app)
      .put(`${API}/${testUser.id}`)
      .send(JSON.stringify(testUser));

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined();
  });
  it('should return 404 on delete non-exist user', async () => {
    const id = testUser.id;

    const response = await supertest(app).delete(`${API}/${id}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined();
  });
});

describe('Scenario 3 - non-exist endpoint', () => {
  let app: Server;
  let fakeUser: User;
  beforeAll(async () => {
    app = start();
    fakeUser = new User('d8a4ecdd-0a48-4c2b-9454-1c7accb72cd0', 'Jack', 10, ['haking', 'music']);
  });
  afterAll(async () => {
    app.close();
  });

  it('should return 404 on get non-exist endpoint', async () => {
    const response = await supertest(app).get(`${API}/${fakeUser.id}/wrong`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined();
  });
  it('should return 404 on get non-exist endpoint', async () => {
    const response = await supertest(app).get('/wrong');

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined();
  });
});
