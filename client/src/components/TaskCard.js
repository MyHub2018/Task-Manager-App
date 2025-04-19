import React from 'react';
import { useNavigate } from 'react-router-dom';

function TaskCard({ task, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`/api/tasks/${task.id}`, {
      method: 'DELETE',
    })
      .then(() => onDelete(task.id))
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p className="due">Due: {task.due_date}</p>
      <div className="task-actions">
        <button onClick={() => navigate(`/task/${task.id}/edit`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
