import { Request, Response, NextFunction } from 'express';
import JsonResponse from '../utils/JsonResponse';
import StudentNotFoundException from '../exceptions/StudentNotFoundException';

export default function exceptionsMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let response: JsonResponse;

    if (err instanceof StudentNotFoundException) {
        response = JsonResponse.failed(err.message, err.statusCode);
    } else {
        response = JsonResponse.failed(err.message);
    }

    res.status(response.statusCode).send(response);
    next();
}
