import { memo } from 'react';
import { useTasks } from '../context/TaskContext';
import { FiCheck, FiTrash, FiMoreVertical } from 'react-icons/fi';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';

const TaskItem = ({ task, index }) => {
  const { toggleTask, deleteTask } = useTasks();
  
  // Safeguard against invalid task objects
  if (!task || !task._id) {
    return null;
  }
  
  return (
    <Draggable draggableId={String(task._id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={classNames(
            'task-item animate-fade-in',
            {
              'bg-blue-50 dark:bg-blue-900/20': snapshot.isDragging,
            }
          )}
          style={provided.draggableProps.style}
        >
          <div className="flex items-center flex-1 min-w-0">
            <div
              {...provided.dragHandleProps}
              className="mr-2 cursor-grab text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
            >
              <FiMoreVertical />
            </div>
            
            <button
              onClick={() => toggleTask(task._id)}
              className={classNames(
                'flex items-center justify-center w-5 h-5 mr-3 border rounded-md transition-colors duration-200',
                task.completed
                  ? 'bg-primary-light dark:bg-primary-dark border-primary-light dark:border-primary-dark'
                  : 'border-gray-300 dark:border-gray-700 hover:border-primary-light dark:hover:border-primary-dark'
              )}
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed && <FiCheck className="text-white text-sm" />}
            </button>
            
            <span
              className={classNames('flex-1 truncate', {
                'task-complete': task.completed
              })}
            >
              {task.title}
            </span>
          </div>
          
          <button
            onClick={() => deleteTask(task._id)}
            className="ml-2 p-1 text-gray-400 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors duration-200 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
            aria-label="Delete task"
          >
            <FiTrash />
          </button>
        </div>
      )}
    </Draggable>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(TaskItem);