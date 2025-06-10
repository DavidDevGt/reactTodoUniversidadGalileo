import { ListGroup } from 'react-bootstrap';
import type { Task } from '../models/Task';
import TaskItem from './TaskItem';
import '../styles/TaskList.scss';

interface TaskListProps {
  tasks: Task[];
  onRemove: (id: number) => void;
  onToggleComplete?: (id: number) => void;
}

export default function TaskList({ tasks, onRemove, onToggleComplete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks-container">
        <div className="no-tasks-message">
          <h3>📝 No tasks yet</h3>
          <p>Start by creating your first task to get organized!</p>
        </div>
      </div>
    );
  }

  // Separar tasks completadas y pendientes
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="task-list-container">
      {pendingTasks.length > 0 && (
        <div className="tasks-section">
          <h4 className="section-title">Pending Tasks ({pendingTasks.length})</h4>
          <ListGroup>
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onRemove={onRemove}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </ListGroup>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="tasks-section">
          <h4 className="section-title">Completed Tasks ({completedTasks.length})</h4>
          <ListGroup>
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onRemove={onRemove}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
}
