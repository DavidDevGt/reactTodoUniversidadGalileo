import type React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/AddTaskForm.scss';

interface AddTaskFormProps {
  onAdd: (title: string, description: string, dueDate: string) => void;
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [touched, setTouched] = useState({ title: false, description: false, dueDate: false });
  const [errors, setErrors] = useState<{ dueDate?: string }>({});

  // Get today in yyyy-mm-dd format
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const validate = () => {
    const errs: { dueDate?: string } = {};
    if (!dueDate) {
      errs.dueDate = 'Due date is required';
    } else if (dueDate < todayStr) {
      errs.dueDate = 'Due date cannot be before today';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, description: true, dueDate: true });
    const validationErrors = validate();
    setErrors(validationErrors);
    if (!title.trim() || !description.trim() || !dueDate || Object.keys(validationErrors).length > 0)
      return;
    onAdd(title, description, dueDate);
    setTitle('');
    setDescription('');
    setDueDate('');
    setTouched({ title: false, description: false, dueDate: false });
    setErrors({});
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  return (
    <Form onSubmit={handleSubmit} className="add-form">
      <Form.Group className="mb-3">
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleBlur('title')}
          placeholder="What do you want to do?"
          required
          isInvalid={touched.title && !title.trim()}
        />
        {touched.title && !title.trim() && (
          <div className="input-error-label">Task title is required</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => handleBlur('description')}
          placeholder="Describe your task"
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
          value={dueDate}
          min={todayStr}
          onChange={(e) => setDueDate(e.target.value)}
          onBlur={() => handleBlur('dueDate')}
          required
          isInvalid={touched.dueDate && !!errors.dueDate}
        />
        {touched.dueDate && errors.dueDate && (
          <div className="input-error-label">{errors.dueDate}</div>
        )}
      </Form.Group>

      <Button type="submit" className="w-100 btn-moradito">
        Add Task
      </Button>
    </Form>
  );
}
