import { ListGroup } from 'react-bootstrap';
import type { Task } from '../models/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onRemove: (id: string) => void;
}

export default function TaskList({ tasks, onRemove }: TaskListProps) {
  return (
    <div>
      {tasks.length === 0 && (
        <div style={{ color: '#bbb', textAlign: 'center', marginTop: '2rem' }}>No tasks yet.</div>
      )}
      <ListGroup>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onRemove={onRemove} />
        ))}
      </ListGroup>
    </div>
  );
}