class JsonResponse {
    constructor(
        public readonly statusCode: number = 200,
        public readonly message: string = '',
        public readonly data: any = null,
        public readonly error: string | null = ''
    ) {}

    public static success(
        data: any = null,
        statusCode: number = 200,
        message?: string
    ) {
        return new JsonResponse(statusCode, message, data, null);
    }

    public static failed(error: string, statusCode: number = 400) {
        return new JsonResponse(statusCode, 'Error', null, error);
    }
}

export default JsonResponse;
