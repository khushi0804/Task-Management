import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import taskService from '../services/taskService';

// Create context
const TaskContext = createContext(null);

// Filter types
export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

// Task provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(FILTER_TYPES.ALL);
  
  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  
  // Create a new task
  const addTask = async (title) => {
    try {
      setError(null);
      const newTask = await taskService.createTask(title);
      setTasks(prevTasks => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
      return null;
    }
  };
  
  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      setError(null);
      const taskToUpdate = tasks.find(task => task._id === id);
      if (!taskToUpdate) return null;
      
      const updatedTask = await taskService.updateTask(id, {
        completed: !taskToUpdate.completed
      });
      
      setTasks(prevTasks =>
        prevTasks.map(task => (task._id === id ? updatedTask : task))
      );
      
      return updatedTask;
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
      return null;
    }
  };
  
  // Delete a task
  const deleteTask = async (id) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
      return false;
    }
  };
  
  // Handle drag and drop reordering
  const reorderTasks = async (sourceIndex, destinationIndex, taskId) => {
    try {
      setError(null);
      
      // Optimistic update
      const reorderedTasks = [...tasks];
      const [removed] = reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, removed);
      setTasks(reorderedTasks);
      
      // Server update
      const updatedTasks = await taskService.reorderTasks(
        sourceIndex,
        destinationIndex,
        taskId
      );
      
      // Update with server response
      setTasks(updatedTasks);
      return true;
    } catch (err) {
      // Revert optimistic update on error
      fetchTasks();
      setError('Failed to reorder tasks. Please try again.');
      console.error('Error reordering tasks:', err);
      return false;
    }
  };
  
  // Get filtered tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === FILTER_TYPES.ACTIVE) return !task.completed;
    if (filter === FILTER_TYPES.COMPLETED) return task.completed;
    return true; // ALL
  });
  
  // Change filter
  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };
  
  // Clear all completed tasks
  const clearCompleted = async () => {
    try {
      setError(null);
      const completedTasks = tasks.filter(task => task.completed);
      
      // Delete each completed task
      const deletePromises = completedTasks.map(task => 
        taskService.deleteTask(task._id)
      );
      
      await Promise.all(deletePromises);
      
      // Update state
      setTasks(prevTasks => prevTasks.filter(task => !task.completed));
      return true;
    } catch (err) {
      setError('Failed to clear completed tasks. Please try again.');
      console.error('Error clearing completed tasks:', err);
      return false;
    }
  };
  
  // Count tasks by status
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };
  
  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        loading,
        error,
        filter,
        taskCounts,
        addTask,
        toggleTask,
        deleteTask,
        reorderTasks,
        changeFilter,
        clearCompleted,
        refreshTasks: fetchTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  
  if (context === null) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  
  return context;
};

export default TaskContext;