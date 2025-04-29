import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-200">
          <Header />
          
          <main className="flex-grow container mx-auto px-4 py-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-text-light dark:text-text-dark">
                Manage Your Tasks
              </h2>
              
              <TaskForm />
              <FilterButtons />
              <TaskList />
            </div>
          </main>
          
          <Footer />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;