import { Button, ListGroup } from 'react-bootstrap';
import '../styles/GoalItem.scss';
import type { Goal } from '../models/Goal';

interface GoalItemProps {
  goal: Goal;
  onRemove: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

export default function GoalItem({ goal, onRemove, onToggleComplete }: GoalItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = () => {
    const today = new Date();
    const targetDate = new Date(goal.targetDate);
    return !goal.completed && targetDate < today;
  };

  return (
    <ListGroup.Item
      className={`goal-card ${goal.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}
    >
      <div className="goal-card-content">
        <div className="goal-label">
          <span>Goal:</span>
        </div>
        <div className={`goal-value ${goal.completed ? 'goal-completed' : ''}`}>{goal.title}</div>

        <div className="goal-label">
          <span>Description:</span>
        </div>
        <div className={`goal-value ${goal.completed ? 'goal-completed' : ''}`}>
          {goal.description}
        </div>

        <div className="goal-label">
          <span>Target Date:</span>
        </div>
        <div className={`goal-value goal-target-date ${goal.completed ? 'goal-completed' : ''}`}>
          {formatDate(goal.targetDate)}
          {isOverdue() && <span className="overdue-indicator"> (Overdue)</span>}
        </div>

        <div className="goal-label">
          <span>Created:</span>
        </div>
        <div className={`goal-value ${goal.completed ? 'goal-completed' : ''}`}>
          {formatDate(goal.createdAt)}
        </div>

        <div className="goal-status">
          <span className={`status-badge ${goal.completed ? 'completed' : 'in-progress'}`}>
            {goal.completed ? '✓ Completed' : '⏳ In Progress'}
          </span>
        </div>

        <div className="goal-card-actions">
          <Button
            variant="outline-success"
            size="sm"
            className="toggle-btn"
            onClick={() => onToggleComplete(goal.id)}
            aria-label={goal.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {goal.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Button>
          <Button
            variant="link"
            className="remove-btn"
            onClick={() => onRemove(goal.id)}
            aria-label="Remove goal"
          >
            Remove
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
}
