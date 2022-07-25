import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";

function App() {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const fetchTodos = () => {
    fetch('http://localhost:5000/todo')
      .then(res => res.json())
      .then(data => setTodos(data))
  };
        
  useEffect(() => { fetchTodos() }, [setTodos]);

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
        fetchTodos={fetchTodos}
        />
      </div>
      <div>
      <TodoList 
      todos={todos}
      setTodos={setTodos}
      setEditTodo={setEditTodo}
      fetchTodos={fetchTodos}
      />
      </div>
    </div>
  );
};

export default App;