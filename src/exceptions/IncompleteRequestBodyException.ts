export default class IncompleteRequestBodyException extends Error {
    constructor(
        message: string = 'Incomplete login credentials. Expecting user_id and password',
        public readonly statusCode: number = 422
    ) {
        super(message);
    }
}
