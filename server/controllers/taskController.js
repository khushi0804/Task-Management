import Task from '../models/Task.js';

// Get all tasks sorted by position
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ position: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }
    
    // Find the highest position to place new task at the end
    const lastTask = await Task.findOne().sort({ position: -1 });
    const position = lastTask ? lastTask.position + 1 : 0;
    
    const newTask = await Task.create({
      title,
      position
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    
    const updatedTask = await task.save();
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await task.deleteOne();
    
    res.status(200).json({ message: 'Task deleted', id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reorder tasks
export const reorderTasks = async (req, res) => {
  try {
    const { sourceIndex, destinationIndex, taskId } = req.body;
    
    // Find all tasks and sort by position
    const tasks = await Task.find().sort({ position: 1 });
    
    // Optimized reordering algorithm
    if (sourceIndex !== destinationIndex) {
      // Remove the task from its original position
      const [movedTask] = tasks.splice(sourceIndex, 1);
      
      // Insert the task at its new position
      tasks.splice(destinationIndex, 0, movedTask);
      
      // Update positions in the database (bulk operation)
      const updateOperations = tasks.map((task, index) => ({
        updateOne: {
          filter: { _id: task._id },
          update: { position: index }
        }
      }));
      
      await Task.bulkWrite(updateOperations);
    }
    
    // Return the updated list
    const updatedTasks = await Task.find().sort({ position: 1 });
    res.status(200).json(updatedTasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};