import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks
} from '../controllers/taskController.js';

const router = express.Router();

// Get all tasks
router.get('/', getTasks);

// Create a new task
router.post('/', createTask);

// Update a task
router.put('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

// Reorder tasks
router.post('/reorder', reorderTasks);

export default router;