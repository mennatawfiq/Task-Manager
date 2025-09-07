import { Request, Response } from 'express';

const getAllTasks = (req: Request, res: Response) => {
    res.json(req.body);
};

const createTask = (req: Request, res: Response) => {
    res.send('create task');
};

const getTask = (req: Request, res: Response) => {
    res.send('get task');
};

const updateTask = (req: Request, res: Response) => {
    res.send('update task');
};

const deleteTask = (req: Request, res: Response) => {
    res.send('delete task');
};

export { getAllTasks, createTask, getTask, updateTask, deleteTask };