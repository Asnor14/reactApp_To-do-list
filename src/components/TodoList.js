import TodoItem from './TodoItem';

function TodoList({ 
  todos, 
  onToggleTodo, 
  onDeleteTodo, 
  onEditTodo
}) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
