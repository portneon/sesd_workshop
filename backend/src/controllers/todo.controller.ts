import { ToDoServices } from '../services/todo.services';
import { Request, Response } from 'express';

class ToDoController {
    todoservices = new ToDoServices();

    createTaskRoute = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, description } = req.body;
            if (!title) {
                res.status(400).json({ error: 'Title is required' });
                return;
            }
            const task = await this.todoservices.createTask(title, description);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create task' });
        }
    }

    getTaskRoute = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const task = await this.todoservices.getTask(id);
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch task' });
        }
    }

    getAllTasksRoute = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await this.todoservices.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    }

    updateTaskRoute = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const data = req.body;
            const task = await this.todoservices.updateTask(id, data);
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update task' });
        }
    }

    deleteTaskRoute = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const task = await this.todoservices.deleteTask(id);
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.status(200).json({ message: 'Task deleted successfully', task });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete task' });
        }
    }
}

export default new ToDoController();