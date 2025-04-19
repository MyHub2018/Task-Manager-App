import React from 'react';
import { useNavigate } from 'react-router-dom';

function TaskCard({ task, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          onDelete(task.id);
        } else {
          console.error('Failed to delete task.');
        }
      })
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
