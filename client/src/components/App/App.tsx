import React from "react";
import TodoList from "../Todos";
import UsersList from "../Users";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <UsersList />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
