import { Request, Response, NextFunction } from 'express';
import JsonResponse from '../utils/JsonResponse';
import {
    StudentNotFoundException,
    UserNotFoundException,
    PasswordIncorrectException,
    TeacherNotFoundException,
    SubjectNotFoundException,
    IncompleteRequestBodyException,
} from '../exceptions/';

export default function exceptionsMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let response: JsonResponse;

    if (
        err instanceof StudentNotFoundException ||
        err instanceof PasswordIncorrectException ||
        err instanceof TeacherNotFoundException ||
        err instanceof SubjectNotFoundException ||
        err instanceof IncompleteRequestBodyException ||
        err instanceof UserNotFoundException
    ) {
        response = JsonResponse.failed(err.message, err.statusCode);
    } else {
        response = JsonResponse.failed(err.message);
    }

    res.status(response.statusCode).send(response);
    next();
}
