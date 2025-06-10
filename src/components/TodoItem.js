import 'boxicons/css/boxicons.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaughBeam, faFaceMeh, faFaceSadTear } from '@fortawesome/free-solid-svg-icons';

function getCompletionIcon(todo) {
  if (!todo.completed || !todo.dueDate || !todo.completedAt) return null;
  const due = new Date(todo.dueDate);
  const completed = new Date(todo.completedAt);
  if (completed < due) return <FontAwesomeIcon icon={faFaceLaughBeam} style={{color: '#10B981'}} title="Completed before due date" />;
  if (completed.toDateString() === due.toDateString()) return <FontAwesomeIcon icon={faFaceMeh} style={{color: '#A78BFA'}} title="Completed on due date" />;
  if (completed > due) return <FontAwesomeIcon icon={faFaceSadTear} style={{color: '#EF4444'}} title="Completed after due date" />;
  return null;
}

function getCountdown(todo) {
  if (!todo.dueDate) return null;
  const now = new Date();
  const due = new Date(todo.dueDate);
  const diff = due - now;
  if (diff < 0) return 'Past due';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${mins}m left`;
  if (mins > 0) return `${mins}m left`;
  return 'Due soon';
}

function TodoItem({ 
  todo, 
  onToggleTodo,
  onDeleteTodo,
  onEditTodo
}) {
  const completionIcon = getCompletionIcon(todo);
  const countdown = getCountdown(todo);
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <button
          className={`checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={() => onToggleTodo(todo.id)}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <i className='bx bx-check'></i>}
        </button>
        <div className="todo-text-container">
          <div className="todo-title-row">
            <span className="todo-text">{todo.text}</span>
            {completionIcon && <span className="completion-emoji">{completionIcon}</span>}
          </div>
          <span className="todo-date">Created: {todo.createdAt}</span>
          {todo.dueDate && (
            <span className="todo-due">Due: {todo.dueDate} {(!todo.completed && countdown) && <span className="countdown">({countdown})</span>}</span>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onEditTodo(todo)}
          className="edit-button"
          aria-label="Edit task"
        >
          <i className='bx bx-edit'></i>
        </button>
        <button
          onClick={() => onDeleteTodo(todo)}
          className="delete-button"
          aria-label="Delete task"
        >
          <i className='bx bx-trash'></i>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
