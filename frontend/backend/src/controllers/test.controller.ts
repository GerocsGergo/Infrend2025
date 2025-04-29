import { Request, Response } from 'express';

export class TestController {



    handleError = (res: Response, err: any, status = 500, message = 'Unknown server error.') => {
        if (err) {
            console.error(err);
        }
        res.status(status).json({ message });
    }
}