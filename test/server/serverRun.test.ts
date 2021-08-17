import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/server';

describe('Server Test', () => {
    it('should return 200 status on home route', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).to.equal(200);
    });
});
