import type React from 'react';
import { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import AddGoalForm from './components/AddGoalForm';
import Header from './components/Header';
import TaskList from './components/TaskList';
import GoalList from './components/GoalList';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, toggleTaskCompletion } from './store/taskSlice';
import { addGoal, removeGoal, toggleGoalCompletion } from './store/goalSlice';
import type { RootState } from './store/store';

function App() {
  const dispatch = useDispatch();
  
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const goals = useSelector((state: RootState) => state.goals.goals);
  const activeView = useSelector((state: RootState) => state.navigation.activeView);

  const [showModal, setShowModal] = useState(false);

  // Task handlers
  const handleAddTask = (title: string, description: string, dueDate: string) => {
    const newTask = {
      id: Date.now(), // Usando timestamp como ID temporal
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch(addTask(newTask));
    setShowModal(false);
  };

  const handleRemoveTask = (id: number) => {
    dispatch(removeTask(id));
  };

  const handleToggleTaskCompletion = (id: number) => {
    dispatch(toggleTaskCompletion(id));
  };

  // Goal handlers
  const handleAddGoal = (title: string, description: string, targetDate: string) => {
    const newGoal = {
      id: Date.now(), // Usando timestamp como ID temporal
      title,
      description,
      targetDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch(addGoal(newGoal));
    setShowModal(false);
  };

  const handleRemoveGoal = (id: number) => {
    dispatch(removeGoal(id));
  };

  const handleToggleGoalCompletion = (id: number) => {
    dispatch(toggleGoalCompletion(id));
  };

  // Modal handlers
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
        <button 
          type="button" 
          className="add-goal-btn-mobile" 
          onClick={() => setShowModal(true)}
        >
          {activeView === 'tasks' ? 'ADD TASK' : 'ADD GOAL'}
        </button>
        
        <div className="add-form-desktop">
          {activeView === 'tasks' ? (
            <AddTaskForm onAdd={handleAddTask} />
          ) : (
            <AddGoalForm onAdd={handleAddGoal} />
          )}
        </div>
        
        {activeView === 'tasks' ? (
          <TaskList 
            tasks={tasks} 
            onRemove={handleRemoveTask}
            onToggleComplete={handleToggleTaskCompletion}
          />
        ) : (
          <GoalList 
            goals={goals} 
            onRemove={handleRemoveGoal}
            onToggleComplete={handleToggleGoalCompletion}
          />
        )}
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
            {activeView === 'tasks' ? (
              <AddTaskForm onAdd={handleAddTask} />
            ) : (
              <AddGoalForm onAdd={handleAddGoal} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
