import { ListGroup, Button } from 'react-bootstrap';
import '../styles/TaskItem.css';
import { Task } from '../models/Task';

interface TaskItemProps {
  task: Task;
  onRemove: (id: string) => void;
}

export default function TaskItem({ task, onRemove }: TaskItemProps) {
  return (
    <ListGroup.Item className="task-card">
      <div className="task-card-content">
        <div className="task-label"><span>Name:</span></div>
        <div className="task-value">{task.text}</div>
        <div className="task-label"><span>Description:</span></div>
        <div className="task-value">{task.description}</div>
        <div className="task-label"><span>Due Date:</span></div>
        <div className="task-value task-due-date">{task.due}</div>
        <div className="task-card-actions">
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