import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FiRefreshCw } from 'react-icons/fi';

const TaskList = () => {
  const { tasks, loading, error, reorderTasks, refreshTasks } = useTasks();
  const [isRefreshing, setIsRefreshing] = useState(false);
  // Add local tasks state to ensure we have stable references
  const [localTasks, setLocalTasks] = useState([]);
  
  // Update local tasks when tasks from context change
  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      // Ensure each task has a valid string ID
      const validTasks = tasks.filter(task => 
        task && task._id && typeof task._id === 'string'
      );
      setLocalTasks(validTasks);
    }
  }, [tasks]);

  // Handle drag end event
  const handleDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) return;
    
    // Position didn't change
    if (result.destination.index === result.source.index) return;
    
    // Update task positions
    reorderTasks(
      result.source.index,
      result.destination.index,
      result.draggableId
    );
  };
  
  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshTasks();
    setIsRefreshing(false);
  };
  
  // Show loading state
  if (loading && !isRefreshing) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    );
  }
  
  // Show error state
  if (error && !isRefreshing) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-center mb-6">
        <p className="mb-2">{error}</p>
        <button 
          onClick={handleRefresh}
          className="btn bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-700"
        >
          <FiRefreshCw className="mr-1" /> Try Again
        </button>
      </div>
    );
  }
  
  // Show empty state
  if (localTasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        <p className="mb-2 text-lg">No tasks found</p>
        <p>Add a new task to get started!</p>
      </div>
    );
  }
  
  // Show task list
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="relative">
        {isRefreshing && (
          <div className="absolute inset-0 bg-background-light/50 dark:bg-background-dark/50 flex justify-center items-center z-10 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
          </div>
        )}
        
        <Droppable droppableId="taskList">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {localTasks.map((task, index) => (
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  index={index} 
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={handleRefresh}
            className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
            disabled={isRefreshing}
          >
            <FiRefreshCw className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskList;