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
    setShowModal(false); // Cierra el modal en móvil
  };

  const handleRemoveTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <>
      <Header />
      <div className="app-main-container">
        {/* Botón solo visible en móvil */}
        <button className="add-goal-btn-mobile" onClick={() => setShowModal(true)}>
          ADD GOAL
        </button>
        {/* Formulario embebido solo visible en desktop */}
        <div className="add-form-desktop">
          <AddTaskForm onAdd={handleAddTask} />
        </div>
        <TaskList tasks={tasks} onRemove={handleRemoveTask} />
      </div>
      {/* Modal solo visible en móvil */}
      {showModal && (
        <div className="modal-overlay-mobile" onClick={() => setShowModal(false)}>
          <div className="modal-content-mobile" onClick={e => e.stopPropagation()}>
            <AddTaskForm onAdd={handleAddTask} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
