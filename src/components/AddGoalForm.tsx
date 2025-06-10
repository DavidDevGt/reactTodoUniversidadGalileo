import type React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/AddGoalForm.scss';

interface AddGoalFormProps {
  onAdd: (title: string, description: string, targetDate: string) => void;
}

export default function AddGoalForm({ onAdd }: AddGoalFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [touched, setTouched] = useState({ title: false, description: false, targetDate: false });
  const [errors, setErrors] = useState<{ targetDate?: string }>({});

  // Get today in yyyy-mm-dd format
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const validate = () => {
    const errs: { targetDate?: string } = {};
    if (!targetDate) {
      errs.targetDate = 'Target date is required';
    } else if (targetDate < todayStr) {
      errs.targetDate = 'Target date cannot be in the past';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, description: true, targetDate: true });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && title && description && targetDate) {
      onAdd(title, description, targetDate);
      setTitle('');
      setDescription('');
      setTargetDate('');
      setTouched({ title: false, description: false, targetDate: false });
      setErrors({});
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  return (
    <Form onSubmit={handleSubmit} className="add-form">
      <Form.Group className="mb-3">
        <Form.Label>Goal Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleBlur('title')}
          isInvalid={touched.title && !title}
          placeholder="Enter goal title"
          required
        />
        {touched.title && !title && <div className="input-error-label">Goal title is required</div>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => handleBlur('description')}
          isInvalid={touched.description && !description}
          className="add-form-textarea"
          placeholder="Describe your goal"
          required
        />
        {touched.description && !description && (
          <div className="input-error-label">Description is required</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Target Date</Form.Label>
        <Form.Control
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          onBlur={() => handleBlur('targetDate')}
          isInvalid={touched.targetDate && !!errors.targetDate}
          min={todayStr}
          required
        />
        {touched.targetDate && errors.targetDate && (
          <div className="input-error-label">{errors.targetDate}</div>
        )}
      </Form.Group>

      <Button type="submit" className="btn-moradito w-100">
        Add Goal
      </Button>
    </Form>
  );
}
