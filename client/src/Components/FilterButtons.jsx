import { useTasks, FILTER_TYPES } from '../context/TaskContext';
import classNames from 'classnames';

const FilterButtons = () => {
  const { filter, changeFilter, taskCounts, clearCompleted } = useTasks();
  
  const filterButtons = [
    { type: FILTER_TYPES.ALL, label: 'All', count: taskCounts.all },
    { type: FILTER_TYPES.ACTIVE, label: 'Active', count: taskCounts.active },
    { type: FILTER_TYPES.COMPLETED, label: 'Completed', count: taskCounts.completed }
  ];
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-card-light dark:bg-card-dark rounded-lg shadow-custom-light dark:shadow-custom-dark p-4">
      <div className="flex space-x-2 mb-3 sm:mb-0">
        {filterButtons.map(({ type, label, count }) => (
          <button
            key={type}
            onClick={() => changeFilter(type)}
            className={classNames('filter-btn', {
              'filter-btn-active': filter === type,
              'hover:bg-gray-200 dark:hover:bg-gray-700': filter !== type
            })}
            aria-pressed={filter === type}
          >
            {label} ({count})
          </button>
        ))}
      </div>
      
      <button
        onClick={clearCompleted}
        disabled={taskCounts.completed === 0}
        className={classNames(
          'text-sm px-3 py-1 rounded-md transition-colors duration-200',
          taskCounts.completed > 0
            ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
        )}
      >
        Clear completed
      </button>
    </div>
  );
};

export default FilterButtons;