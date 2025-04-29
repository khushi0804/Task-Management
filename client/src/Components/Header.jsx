import DarkModeToggle from './DarkModeToggle';
import { FiCheckSquare } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FiCheckSquare className="w-7 h-7 text-primary-light dark:text-primary-dark" />
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
            Task Manager
          </h1>
        </div>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;