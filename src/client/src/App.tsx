import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import "./App.css";

const url = "http://localhost:8080/api/todos";

interface FetchOptions<T extends object> {
  method: "GET" | "POST" | "PATCH";
  body?: T;
}

const DefaultOptions: FetchOptions<{}> = {
  method: "GET",
};

const execRequest = (URL: string, options: FetchOptions<{}> = DefaultOptions) =>
  fetch(URL, {
    method: options.method,
    body: JSON.stringify(options.body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .catch((e) => {
      console.error("Request error " + url + e);
    });

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const data = await execRequest(url);

    setTodos(data);
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const data: Todo[] = await execRequest(url + "/" + id, {
      method: "PATCH",
      body: { completed },
    });

    setTodos(data);
  };

  const editTodo = async (id: string, title: string) => {
    const data: Todo[] = await execRequest(url + "/" + id, {
      method: "PATCH",
      body: { title },
    });

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

            <input
              type="text"
              onChange={debounce(
                (e) => editTodo(todo._id, e.target.value),
                500
              )}
              value={todo.title}
            />
          </div>
        );
      })}
    </ul>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList />
      </header>
    </div>
  );
}

export default App;
