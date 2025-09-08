import { Request, Response, NextFunction } from 'express';

const errHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ msg: 'something went wrong', err });
}

export { errHandler };