export class ApiError extends Error {
    status: number
    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }

    static  unAuthorized(message: string) {
        return new ApiError(401, message)
    }

    static  forBidden(message: string) {
        return new ApiError(403, message)
    }

    static  internal(message: string) {
        return new ApiError(500, message)
    }
    
    static badRequest(message: string) {
        return new ApiError(400, message)
    }
}
