import type React from 'react';
import { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import Header from './components/Header';
import TaskList from './components/TaskList';
import type { Task } from './models/Task';
import './styles/App.css';
import { useDispatch } from 'react-redux';
import { addTask, removeTask } from './store/taskSlice';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

function App() {
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [showModal, setShowModal] = useState(false);

  const handleAddTask = (text: string, description: string, due: string) => {
    dispatch(addTask({
      id: crypto.randomUUID(),
      text,
      description,
      due,
    }));
    setShowModal(false);
  };

  const handleRemoveTask = (id: string) => {
    dispatch(removeTask(id));
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
