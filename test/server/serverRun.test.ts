import { expect } from 'chai';
import request from 'supertest';
import createServer from '../../src/createServer';

describe('Server Test', () => {
  let app: Express.Application;

  beforeEach(async () => {
    app = await createServer();
  });

  it('should return 200 status on home route', async () => {
    const response = await request(app).get('/v1');

    expect(response.statusCode).to.equal(200);
    expect(response.text).to.equal('JDVNHS WebAPI');
  });

  it('should return 404 on invalid route', async () => {
    const response = await request(app).get('/dsfhad');

    expect(response.statusCode).to.equal(404);
    expect(response.body).to.deep.equal({});
  });
});
