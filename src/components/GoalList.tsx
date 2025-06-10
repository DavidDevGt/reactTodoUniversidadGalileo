import { ListGroup } from 'react-bootstrap';
import type { Goal } from '../models/Goal';
import GoalItem from './GoalItem';
import '../styles/GoalList.scss';

interface GoalListProps {
  goals: Goal[];
  onRemove: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

export default function GoalList({ goals, onRemove, onToggleComplete }: GoalListProps) {
  if (goals.length === 0) {
    return (
      <div className="no-goals-container">
        <div className="no-goals-message">
          <h3>🎯 No goals yet</h3>
          <p>Start by creating your first goal to track your progress!</p>
        </div>
      </div>
    );
  }

  // Separar goals completadas y en progreso
  const activeGoals = goals.filter((goal) => !goal.completed);
  const completedGoals = goals.filter((goal) => goal.completed);

  return (
    <div className="goal-list-container">
      {activeGoals.length > 0 && (
        <div className="goals-section">
          <h4 className="section-title">Active Goals ({activeGoals.length})</h4>
          <ListGroup>
            {activeGoals.map((goal) => (
              <GoalItem
                key={goal.id}
                goal={goal}
                onRemove={onRemove}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </ListGroup>
        </div>
      )}

      {completedGoals.length > 0 && (
        <div className="goals-section">
          <h4 className="section-title">Completed Goals ({completedGoals.length})</h4>
          <ListGroup>
            {completedGoals.map((goal) => (
              <GoalItem
                key={goal.id}
                goal={goal}
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
