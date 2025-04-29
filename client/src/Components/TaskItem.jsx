
import { memo } from 'react';
import { useTasks } from '../context/TaskContext';
import { FiCheck, FiTrash, FiMoreVertical } from 'react-icons/fi';
import { Draggable } from '@hello-pangea/dnd';
import classNames from 'classnames';

const TaskItem = ({ task, index }) => {
  const { toggleTask, deleteTask } = useTasks();

  // Safeguard against invalid task objects
  if (!task || !task._id) {
    return null;
  }

  return (
    <Draggable draggableId={task._id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={classNames(
            'group relative p-3 bg-white dark:bg-gray-800/90 rounded-lg shadow-sm',
            'border border-gray-200 dark:border-gray-700',
            'transform transition-all duration-200 ease-in-out',
            'hover:shadow-md hover:border-primary-light dark:hover:border-primary-dark',
            {
              'shadow-lg scale-[1.02] z-50': snapshot.isDragging,
              'border-blue-300 dark:border-blue-700 bg-blue-50/90 dark:bg-blue-900/30': snapshot.isDragging && !task.completed,
              'border-green-300 dark:border-green-700 bg-green-50/90 dark:bg-green-900/30': snapshot.isDragging && task.completed,
              'opacity-95': snapshot.isDragging
            }
          )}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging
              ? `${provided.draggableProps.style?.transform} scale(1.02)`
              : provided.draggableProps.style?.transform,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              {...provided.dragHandleProps}
              className={classNames(
                'cursor-grab text-gray-400 dark:text-gray-600',
                'hover:text-gray-600 dark:hover:text-gray-400',
                'transition-colors duration-200',
                'p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md',
                { 'cursor-grabbing': snapshot.isDragging }
              )}
              aria-label="Drag handle"
            >
              <FiMoreVertical className="w-4 h-4" />
            </div>

            <button
              onClick={() => toggleTask(task._id)}
              className={classNames(
                'flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200',
                'hover:scale-110',
                task.completed
                  ? 'bg-green-500 dark:bg-green-600 text-white'
                  : 'border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
              )}
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed && <FiCheck className="text-white text-sm" />}
            </button>

            <span
              className={classNames(
                'flex-1 text-gray-700 dark:text-gray-200 text-sm transition-all duration-200',
                {
                  'line-through text-gray-400 dark:text-gray-500': task.completed
                }
              )}
            >
              {task.title}
            </span>

            <button
              onClick={() => deleteTask(task._id)}
              className={classNames(
                'opacity-0 group-hover:opacity-100',
                'ml-2 p-2 text-gray-400 hover:text-red-500',
                'dark:text-gray-600 dark:hover:text-red-400',
                'transition-all duration-200 rounded-md',
                'hover:bg-red-50 dark:hover:bg-red-900/20',
                'hover:scale-110'
              )}
              aria-label="Delete task"
            >
              <FiTrash className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(TaskItem);
