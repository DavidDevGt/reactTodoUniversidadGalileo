import type React from 'react';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import AddTaskForm from './components/AddTaskForm';
import AddGoalForm from './components/AddGoalForm';
import Header from './components/Header';
import TaskList from './components/TaskList';
import GoalList from './components/GoalList';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchTasks, 
  createTask, 
  deleteTask, 
  toggleTaskCompletionAsync,
  clearError as clearTaskError 
} from './store/taskSlice';
import { 
  fetchGoals, 
  createGoal, 
  deleteGoal, 
  toggleGoalCompletionAsync,
  clearError as clearGoalError 
} from './store/goalSlice';
import type { RootState, AppDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  
  const { tasks, loading: tasksLoading, error: tasksError } = useSelector((state: RootState) => state.tasks);
  const { goals, loading: goalsLoading, error: goalsError } = useSelector((state: RootState) => state.goals);
  const activeView = useSelector((state: RootState) => state.navigation.activeView);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchGoals());
  }, [dispatch]);

  // Task handlers
  const handleAddTask = async (title: string, description: string, dueDate: string) => {
    try {
      await dispatch(createTask({ title, description, dueDate })).unwrap();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleRemoveTask = async (id: number) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleTaskCompletion = async (id: number) => {
    try {
      await dispatch(toggleTaskCompletionAsync(id)).unwrap();
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Goal handlers
  const handleAddGoal = async (title: string, description: string, targetDate: string) => {
    try {
      await dispatch(createGoal({ title, description, targetDate })).unwrap();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleRemoveGoal = async (id: number) => {
    try {
      await dispatch(deleteGoal(id)).unwrap();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleToggleGoalCompletion = async (id: number) => {
    try {
      await dispatch(toggleGoalCompletionAsync(id)).unwrap();
    } catch (error) {
      console.error('Error toggling goal completion:', error);
    }
  };

  // Error handling
  const currentError = activeView === 'tasks' ? tasksError : goalsError;
  const currentLoading = activeView === 'tasks' ? tasksLoading : goalsLoading;

  const handleDismissError = () => {
    if (activeView === 'tasks') {
      dispatch(clearTaskError());
    } else {
      dispatch(clearGoalError());
    }
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
      
      {/* Error Alert */}
      {currentError && (
        <div className="container mt-3">
          <Alert variant="danger" dismissible onClose={handleDismissError}>
            <strong>Error:</strong> {currentError}
          </Alert>
        </div>
      )}

      {/* Loading Indicator */}
      {currentLoading && (
        <div className="container mt-3">
          <Alert variant="info">
            <div className="d-flex align-items-center">
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Loading...
            </div>
          </Alert>
        </div>
      )}

      <div className="app-main-container">
        <button 
          type="button" 
          className="add-goal-btn-mobile" 
          onClick={() => setShowModal(true)}
          disabled={currentLoading}
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
