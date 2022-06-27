import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import "./App.css";
import { useState, useEffect } from "react";

function App() {

  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);

  // useEffect(()=> {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);
  
  return (
    <div className="app-wrapper">
      <Header />
      <div>
        <Form 
        input={input}
        setInput={setInput}
        todos={todos}
        setTodos={setTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        />
      </div>
      <div>
      <TodoList 
      todos={todos}
      setTodos={setTodos}
      setEditTodo={setEditTodo}/>
      </div>
    </div>
  );
}

export default App;
