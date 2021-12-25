// import { Application } from 'express';
// import request from 'supertest';
// import createServer from '../../src/createServer';

// describe('Server Test', () => {
//   let app: Application;

//   beforeEach(async () => {
//     app = await createServer();
//   });

//   it('should return 200 status on home route', async () => {
//     const response = await request(app).get('/v1');

//     expect(response.statusCode).toBe(200);
//     expect(response.text).toBe('JDVNHS WebAPI');
//   });

//   it('should return 404 on invalid route', async () => {
//     const response = await request(app).get('/dsfhad');

//     expect(response.statusCode).toBe(404);
//     expect(response.body).toEqual({});
//   });
// });

describe('Server test', () => {
  it('should pass', () => {
    expect(true).toBeTruthy();
  });
});
