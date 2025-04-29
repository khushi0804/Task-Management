import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Task API service
const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  
  // Create a new task
  createTask: async (title) => {
    const response = await api.post('/tasks', { title });
    return response.data;
  },
  
  // Update a task
  updateTask: async (id, updates) => {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  },
  
  // Delete a task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
  
  // Reorder tasks after drag and drop
  reorderTasks: async (sourceIndex, destinationIndex, taskId) => {
    const response = await api.post('/tasks/reorder', {
      sourceIndex,
      destinationIndex,
      taskId
    });
    return response.data;
  }
};

export default taskService;