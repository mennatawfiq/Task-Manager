import { Request, Response, NextFunction } from 'express';

const asyncWrapper = (fun: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fun(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export { asyncWrapper };