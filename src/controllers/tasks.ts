import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/Task';
import { asyncWrapper } from '../middlewares/async-wrapper';

const getAllTasks = asyncWrapper(async (req: Request, res: Response) => {
    const tasks = await Task.find({});
    return res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length } });

});

const createTask = asyncWrapper(async (req: Request, res: Response) => {
    const task = await Task.create(req.body);
    return res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (task == null) {
        const error = new Error('Not Found');
        return next(error);
    }
    return res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { runValidators: true, new: true });
    if (task == null) {
        const error = new Error('Not Found');
        return next(error);
    }
    return res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (task == null) {
        const error = new Error('Not Found');
        return next(error);
    }
    return res.status(200).json({ task });
});

export { getAllTasks, createTask, getTask, updateTask, deleteTask };