import { useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { FiPlus } from 'react-icons/fi';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTask, error } = useTasks();
  const inputRef = useRef(null);
  
  // Focus input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!title.trim()) return;
    
    try {
      setIsSubmitting(true);
      const success = await addTask(title.trim());
      
      if (success) {
        setTitle('');
        inputRef.current.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="form-input flex-grow mr-2"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-1" />
          <span>Add</span>
        </button>
      </div>
      
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
};

export default TaskForm;