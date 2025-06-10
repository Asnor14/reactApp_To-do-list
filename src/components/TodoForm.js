import { useState } from 'react';
import 'boxicons/css/boxicons.min.css';

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showDueDateModal, setShowDueDateModal] = useState(false);
  const [pendingTask, setPendingTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setPendingTask(inputValue);
      setShowDueDateModal(true);
    }
  };

  const handleAddWithDueDate = () => {
    onAddTodo(pendingTask, dueDate);
    setInputValue('');
    setDueDate('');
    setShowDueDateModal(false);
    setPendingTask('');
  };

  const handleAddWithoutDueDate = () => {
    onAddTodo(pendingTask, '');
    setInputValue('');
    setDueDate('');
    setShowDueDateModal(false);
    setPendingTask('');
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
            maxLength={200}
          />
          <button type="submit" className="add-button" disabled={!inputValue.trim()}>
            <i className="bx bx-plus add-icon"></i>
            Add Task
          </button>
        </div>
        {inputValue.length > 150 && (
          <div className="character-count">
            {inputValue.length}/200 characters
          </div>
        )}
      </form>
      {showDueDateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div style={{textAlign: 'center'}}>
              <i className="bx bx-calendar" style={{fontSize: '2.5rem', color: '#7C3AED'}}></i>
              <h3>Add a due date?</h3>
              <p>Would you like to set a due date for this task?</p>
              <input
                type="date"
                className="edit-input"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                style={{margin: '1rem 0', width: '100%'}}
              />
              <div className="modal-actions">
                <button className="save-button" onClick={handleAddWithDueDate} disabled={!pendingTask.trim()}>
                  Add{dueDate ? ' with Due Date' : ''}
                </button>
                <button className="cancel-button" onClick={handleAddWithoutDueDate}>
                  Add without Due Date
                </button>
                <button className="cancel-button" onClick={() => { setShowDueDateModal(false); setPendingTask(''); }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoForm;
