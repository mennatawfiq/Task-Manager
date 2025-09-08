import { Request, Response } from 'express';
import { Task } from '../models/Task';

const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length } });
    } catch (err) {
        console.error('Error finding tasks:', err);
        return res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

const createTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.create(req.body);
        return res.status(201).json({ task });
    } catch (err) {
        console.error('Error creating task:', err);
        return res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

const getTask = async (req: Request, res: Response) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (task == null) {
            return res.status(404).json({ msg: `task with id ${taskID} not found` });
        }
        return res.status(200).json({ task });
    } catch (err) {
        console.error('Error finding task:', err);
        return res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

const updateTask = async (req: Request, res: Response) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { runValidators: true, new: true });
        if (task == null) {
            return res.status(404).json({ msg: `task with id ${taskID} not found` });
        }
        return res.status(201).json({ task });
    } catch (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (task == null) {
            return res.status(404).json({ msg: `task with id ${taskID} not found` });
        }
        return res.status(200).json({ task });
    } catch (err) {
        console.error('Error finding task:', err);
        return res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

export { getAllTasks, createTask, getTask, updateTask, deleteTask };