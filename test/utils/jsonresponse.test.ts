import JsonResponse from '../../src/utils/JsonResponse';
import { expect } from 'chai';

describe('Json Response Object', () => {
    it('should return a valid object JsonResponse object when success function is called', () => {
        const actual = JsonResponse.success([100], 200, 'This is the message');
        const expected = {
            statusCode: 200,
            message: 'This is the message',
            data: [100],
            error: null,
        };

        expect(actual).to.deep.equal(expected);
    });

    it('should return a Json Response object with empty message when success function is called and message parameter is omitted', () => {
        const actual = JsonResponse.success([100], 200);
        const expected = {
            statusCode: 200,
            message: '',
            data: [100],
            error: null,
        };

        expect(actual).to.deep.equal(expected);
    });

    it('should return a Json Response object with null data when failed function is called', () => {
        const actual = JsonResponse.failed('Error Message', 400);
        const expected = {
            statusCode: 400,
            message: 'Error',
            data: null,
            error: 'Error Message',
        };

        expect(actual).to.deep.equal(expected);
    });
});
