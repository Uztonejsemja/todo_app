import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import './Form.css';


const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {

    const fetchTodos = () => {
        fetch('http://localhost:5000/todo')
                .then(res => res.json())
                .then(data => setTodos(data))
        }
        
    useEffect(() => { fetchTodos() }, [setTodos]);

    const newTodo = ({title}) => {
        fetch('http://localhost:5000/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: input})
        })
        .then(res => res.json)
        .then(data => {
            fetchTodos();
            setInput("");
        })
    };
    
    const updateTodo = (title, id, completed) => {
        fetch('http://localhost:5000/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, id, completed })
        })
        .then(res => res.json)
        .then(data => {
        const newTodo = todos.map((todo) => 
            todo.id === id ? { title, id, completed } : todo
        );
        setTodos(newTodo);
        setEditTodo("");
        });
    };

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [setInput, editTodo]);
    

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if(!editTodo){
        newTodo({title: input});
    } else {
        updateTodo(input, editTodo.id, editTodo.completed);
    };
    };


    return(
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                placeholder="Enter a todo..."
                className="task-input"
                value={input} required
                onChange={onInputChange}
            />
            <button className="button-add" type="submit">
                {editTodo ? "OK" : "Add"}
            </button>
        </form>
    )
}

export default Form;