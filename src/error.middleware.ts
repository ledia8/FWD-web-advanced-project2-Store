import { Response, Request, NextFunction} from 'express';
import Error from './error.interface';
const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        const status = error.status || 500;
        const message =error.error_message ||'oops! something wrong';
        res.status(status).json([status,message])


    };

    export default errorMiddleware;