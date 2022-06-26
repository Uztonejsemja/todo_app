import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import "./App.css";
import { useState, useEffect } from "react";
import { response } from "express";

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/todo')
        .then(res => res.json())
        .then(data => setTodos(data))
  }, []);

  const createTodo = () => {
    fetch('http://localhost:5000/todo', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createTodo)
    })
    .then(response => response.json());
  }

  return (
    <div className="app-wrapper">
      <Header />
      <div>
        <Form createTodo={createTodo} />
      </div>
      <div>
        <TodoList todos={todos} />
      </div>
    </div>
  )
  // const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  // const [input, setInput] = useState("");
  // const [todos, setTodos] = useState(initialState);
  // const [editTodo, setEditTodo] = useState(null);

  // useEffect(()=> {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);
  

  // return (
  //   <div className="app-wrapper">
  //     <Header />
  //     <div>
  //       <Form 
  //       input={input}
  //       setInput={setInput}
  //       todos={todos}
  //       setTodos={setTodos}
  //       editTodo={editTodo}
  //       setEditTodo={setEditTodo}
  //       />
  //     </div>
  //     <div>
  //     <TodoList 
  //     todos={todos}
  //     setTodos={setTodos}
  //     setEditTodo={setEditTodo}/>
  //     </div>
  //   </div>
  // );
}

export default App;
