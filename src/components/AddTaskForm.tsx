import type React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import '../styles/AddTaskForm.css';

interface AddTaskFormProps {
  onAdd: (text: string, description: string, due: string) => void;
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !description.trim() || !due) return;
    onAdd(text, description, due);
    setText('');
    setDescription('');
    setDue('');
  };

  return (
    <Form onSubmit={handleSubmit} className="add-form">
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué quieres hacer?"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          required
          className="add-form-textarea"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" value={due} onChange={(e) => setDue(e.target.value)} required />
      </Form.Group>
      <Button type="submit" className="w-100 btn-moradito">
        ADD GOAL
      </Button>
    </Form>
  );
}
