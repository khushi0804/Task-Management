import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { FiRefreshCw, FiCheckCircle, FiCircle } from 'react-icons/fi';
import classNames from 'classnames';

const TaskList = () => {
  const { tasks, loading, error, reorderTasks, refreshTasks, toggleTask } = useTasks();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [localTasks, setLocalTasks] = useState({ active: [], completed: [] });
  
  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const validTasks = tasks.filter(task => 
        task && task._id && typeof task._id === 'string'
      );
      
      // Separate tasks into active and completed
      setLocalTasks({
        active: validTasks.filter(task => !task.completed),
        completed: validTasks.filter(task => task.completed)
      });
    }
  }, [tasks]);

  const handleDragStart = () => {
    setIsDragging(true);
    document.body.style.cursor = 'grabbing';
  };

  const handleDragEnd = async (result) => {
    setIsDragging(false);
    document.body.style.cursor = '';
    
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const taskId = result.draggableId;

    if (sourceId !== destinationId) {
      await toggleTask(taskId);
    } else {
      const items = Array.from(localTasks[sourceId]);
      const [removed] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, removed);

      setLocalTasks({
        ...localTasks,
        [sourceId]: items
      });

      reorderTasks(
        result.source.index,
        result.destination.index,
        result.draggableId
      );
    }
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshTasks();
    setIsRefreshing(false);
  };
  
  if (loading && !isRefreshing) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    );
  }
  
  if (error && !isRefreshing) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg text-center mb-6 shadow-sm">
        <p className="mb-3 text-lg font-medium">{error}</p>
        <button 
          onClick={handleRefresh}
          className="btn bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-700 px-6 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
        >
          <FiRefreshCw className="mr-2" /> Try Again
        </button>
      </div>
    );
  }
  
  if (!localTasks.active.length && !localTasks.completed.length) {
    return (
      <div className="text-center py-16 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <p className="mb-3 text-xl font-medium text-gray-600 dark:text-gray-300">No tasks found</p>
        <p className="text-gray-500 dark:text-gray-400">Add a new task to get started!</p>
      </div>
    );
  }
  
  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="relative">
        {isRefreshing && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-10 rounded-lg transition-all duration-200">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Tasks Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FiCircle className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <h3 className="text-lg font-medium">Active Tasks</h3>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  {localTasks.active.length}
                </span>
              </div>
            </div>
            
            <Droppable droppableId="active">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classNames(
                    'p-4 transition-colors duration-200 min-h-[400px]',
                    'border-2 border-dashed rounded-b-xl',
                    {
                      'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800': isDragging && snapshot.isDraggingOver,
                      'border-transparent': !isDragging || !snapshot.isDraggingOver,
                      'space-y-3': localTasks.active.length > 0
                    }
                  )}
                >
                  {localTasks.active.map((task, index) => (
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
          </div>

          {/* Completed Tasks Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FiCheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <h3 className="text-lg font-medium">Completed Tasks</h3>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-full">
                  {localTasks.completed.length}
                </span>
              </div>
            </div>
            
            <Droppable droppableId="completed">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classNames(
                    'p-4 transition-colors duration-200 min-h-[400px]',
                    'border-2 border-dashed rounded-b-xl',
                    {
                      'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800': isDragging && snapshot.isDraggingOver,
                      'border-transparent': !isDragging || !snapshot.isDraggingOver,
                      'space-y-3': localTasks.completed.length > 0
                    }
                  )}
                >
                  {localTasks.completed.map((task, index) => (
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
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={handleRefresh}
            className={classNames(
              'text-sm flex items-center px-4 py-2 rounded-lg',
              'text-gray-500 dark:text-gray-400',
              'hover:text-primary-light dark:hover:text-primary-dark',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'transition-all duration-200'
            )}
            disabled={isRefreshing}
          >
            <FiRefreshCw className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Tasks
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskList;
