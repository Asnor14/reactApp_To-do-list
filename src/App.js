import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [todoToEdit, setTodoToEdit] = useState(null);

  // Format today's date
  const today = new Date();
  const todayStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Add new todo
  const addTodo = (text, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: today.toLocaleDateString(),
      dueDate: dueDate || '',
      completedAt: null
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        if (!todo.completed) {
          return { ...todo, completed: true, completedAt: new Date().toISOString() };
        } else {
          return { ...todo, completed: false, completedAt: null };
        }
      }
      return todo;
    }));
  };

  // Open delete modal
  const handleDeleteClick = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (todoToDelete) {
      setTodos(todos.filter(todo => todo.id !== todoToDelete.id));
      setTodoToDelete(null);
    }
    setShowDeleteModal(false);
  };

  // Open edit modal
  const handleEditClick = (todo) => {
    setTodoToEdit(todo);
    setShowEditModal(true);
  };

  // Confirm edit
  const confirmEdit = () => {
    setTodos(todos.map(todo =>
      todo.id === todoToEdit.id ? { ...todo, text: todoToEdit.text.trim(), dueDate: todoToEdit.dueDate } : todo
    ));
    setShowEditModal(false);
    setTodoToEdit(null);
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Sort by due date (ascending, empty dueDate last)
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  // Get stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>To-Do List</h1>
          <p className="date">{todayStr}</p>
          <p className="subtitle">Stay organized and get things done!</p>
        </header>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{totalTodos}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{activeTodos}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{completedTodos}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <TodoForm onAddTodo={addTodo} />

        <FilterButtons
          currentFilter={filter}
          onFilterChange={setFilter}
          todosCount={{
            all: totalTodos,
            active: activeTodos,
            completed: completedTodos
          }}
        />

        <TodoList
          todos={sortedTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={handleDeleteClick}
          onEditTodo={handleEditClick}
        />

        {totalTodos === 0 && (
          <div className="empty-state">
            <div className="empty-icon"><i className="bx bx-notepad"></i></div>
            <h3>No tasks yet</h3>
            <p>Add your first task above to get started!</p>
          </div>
        )}

        {totalTodos > 0 && sortedTodos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"><i className="bx bx-search"></i></div>
            <h3>No {filter} tasks</h3>
            <p>Try switching to a different filter.</p>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this task?</p>
              <p className="task-preview">"{todoToDelete?.text}"</p>
              <div className="modal-actions">
                <button onClick={() => setShowDeleteModal(false)} className="cancel-button">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Edit Task</h3>
              <p>Edit your task below:</p>
              <div className="modal-content">
                <input
                  type="text"
                  className="edit-input"
                  value={todoToEdit?.text || ''}
                  onChange={(e) => setTodoToEdit({...todoToEdit, text: e.target.value})}
                  maxLength={200}
                />
                <input
                  type="date"
                  className="edit-input"
                  value={todoToEdit?.dueDate || ''}
                  onChange={(e) => setTodoToEdit({...todoToEdit, dueDate: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    setTodoToEdit(null);
                  }} 
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmEdit}
                  className="save-button"
                  disabled={!todoToEdit?.text?.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
