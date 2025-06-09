import { Button, ListGroup } from 'react-bootstrap';
import '../styles/TaskItem.scss';
import type { Task } from '../models/Task';

interface TaskItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onToggleComplete?: (id: number) => void;
}

export default function TaskItem({ task, onRemove, onToggleComplete }: TaskItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return !task.completed && dueDate < today;
  };

  return (
    <ListGroup.Item className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="task-card-content">
        <div className="task-label">
          <span>Task:</span>
        </div>
        <div className={`task-value ${task.completed ? 'task-completed' : ''}`}>{task.title}</div>
        
        <div className="task-label">
          <span>Description:</span>
        </div>
        <div className={`task-value ${task.completed ? 'task-completed' : ''}`}>{task.description}</div>
        
        <div className="task-label">
          <span>Due Date:</span>
        </div>
        <div className={`task-value task-due-date ${task.completed ? 'task-completed' : ''}`}>
          {formatDate(task.dueDate)}
          {isOverdue() && <span className="overdue-indicator"> (Overdue)</span>}
        </div>
        
        <div className="task-label">
          <span>Created:</span>
        </div>
        <div className={`task-value ${task.completed ? 'task-completed' : ''}`}>
          {formatDate(task.createdAt)}
        </div>
        
        <div className="task-status">
          <span className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
            {task.completed ? '✓ Completed' : '⏳ Pending'}
          </span>
        </div>
        
        <div className="task-card-actions">
          {onToggleComplete && (
            <Button
              variant="outline-primary"
              size="sm"
              className="toggle-btn"
              onClick={() => onToggleComplete(task.id)}
              aria-label={task.completed ? "Mark as pending" : "Mark as complete"}
            >
              {task.completed ? 'Mark Pending' : 'Mark Complete'}
            </Button>
          )}
          <Button
            variant="link"
            className="remove-btn"
            onClick={() => onRemove(task.id)}
            aria-label="Remove task"
          >
            Remove
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
}
