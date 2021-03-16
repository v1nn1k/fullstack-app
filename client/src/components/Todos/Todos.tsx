import React, { useState, useEffect } from "react";

import api from "../../api/todos";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const data = await api.get();

    setTodos(data);
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const data: Todo[] = await api.patch(id, { completed });

    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <ul>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id, !todo.completed)}
            />

            <span>{todo.title}</span>
          </div>
        );
      })}
    </ul>
  );
}

export default TodoList;
