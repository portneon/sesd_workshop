import { Router } from 'express';
import todoController from '../controllers/todo.controller';

const router = Router();

router.post('/todos', todoController.createTaskRoute);
router.get('/todos', todoController.getAllTasksRoute);
router.get('/todos/:id', todoController.getTaskRoute);
router.put('/todos/:id', todoController.updateTaskRoute);
router.delete('/todos/:id', todoController.deleteTaskRoute);

export default router;
