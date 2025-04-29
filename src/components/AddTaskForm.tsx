import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/AddTaskForm.css';

interface AddTaskFormProps {
  onAdd: (text: string, description: string, due: string) => void;
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');
  const [touched, setTouched] = useState({ text: false, description: false, due: false });
  const [errors, setErrors] = useState<{ due?: string }>({});

  // Get today in yyyy-mm-dd format
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const validate = () => {
    const errs: { due?: string } = {};
    if (!due) {
      errs.due = 'Due date is required';
    } else if (due < todayStr) {
      errs.due = 'Due date cannot be before today';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ text: true, description: true, due: true });
    const validationErrors = validate();
    setErrors(validationErrors);
    if (!text.trim() || !description.trim() || !due || Object.keys(validationErrors).length > 0) return;
    onAdd(text, description, due);
    setText('');
    setDescription('');
    setDue('');
    setTouched({ text: false, description: false, due: false });
    setErrors({});
  };

  return (
    <Form onSubmit={handleSubmit} className="add-form">
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, text: true }))}
          placeholder="¿Qué quieres hacer?"
          required
          isInvalid={touched.text && !text.trim()}
        />
        {touched.text && !text.trim() && (
          <div className="input-error-label">Name is required</div>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, description: true }))}
          placeholder="Descripción"
          required
          className="add-form-textarea"
          isInvalid={touched.description && !description.trim()}
        />
        {touched.description && !description.trim() && (
          <div className="input-error-label">Description is required</div>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          value={due}
          min={todayStr}
          onChange={(e) => setDue(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, due: true }))}
          required
          isInvalid={touched.due && (!!errors.due || !due)}
        />
        {touched.due && errors.due && (
          <div className="input-error-label">{errors.due}</div>
        )}
      </Form.Group>
      <Button type="submit" className="w-100 btn-moradito">
        ADD GOAL
      </Button>
    </Form>
  );
}
