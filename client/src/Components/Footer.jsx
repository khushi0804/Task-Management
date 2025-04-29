import { FiGithub, FiCode } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2 md:mb-0">
            © {currentYear} Task Manager MERN App
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
              aria-label="View code on GitHub"
            >
              <FiGithub className="mr-1" />
              <span>GitHub</span>
            </a>
            <a
              href="#"
              className="flex items-center hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
              aria-label="View API documentation"
            >
              <FiCode className="mr-1" />
              <span>API</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;