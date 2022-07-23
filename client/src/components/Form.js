import { useEffect } from "react";
import './Form.css';


const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo, fetchTodos }) => {

    const newTodo = () => {
        fetch('http://localhost:5000/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: input})
        })
        .then(res => res.json())
        .then(data => {
            if (!data.ok) throw new Error ('Request did not work');
            fetchTodos();
            setInput("");
        })
    };
    
    const updateTodo = (title, id, completed) => {
        const editedTodo = todos.map((todo) => 
            todo.id === id ? { title, id, completed } : todo
        );
        setTodos(editedTodo);
        setEditTodo("");
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
        updateTodo(input, editTodo.id);
        fetch('http://localhost:5000/edit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: input, id: editTodo.id, completed: editTodo.completed})
        })
        .then(res => res.json())
        .then(data => {
            if (!data.ok) throw new Error ('Request did not work');
            fetchTodos();
            setEditTodo("");
        })
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