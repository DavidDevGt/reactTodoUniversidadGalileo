import type React from 'react';
import { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import Header from './components/Header';
import TaskList from './components/TaskList';
import type { Task } from './models/Task';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = (text: string, description: string, due: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        description,
        due,
      },
    ]);
    setShowModal(false);
  };

  const handleRemoveTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleModalOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      setShowModal(false);
    }
  };

  const handleModalContentKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <Header />
      <div className="app-main-container">
        <button type="button" className="add-goal-btn-mobile" onClick={() => setShowModal(true)}>
          ADD GOAL
        </button>
        <div className="add-form-desktop">
          <AddTaskForm onAdd={handleAddTask} />
        </div>
        <TaskList tasks={tasks} onRemove={handleRemoveTask} />
      </div>
      {showModal && (
        <div
          className="modal-overlay-mobile"
          onClick={() => setShowModal(false)}
          aria-label="Close modal"
          onKeyDown={handleModalOverlayKeyDown}
        >
          <div
            className="modal-content-mobile"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleModalContentKeyDown}
          >
            <AddTaskForm onAdd={handleAddTask} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
