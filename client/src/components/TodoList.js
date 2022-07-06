import { useEffect } from 'react';
import images from "../assets/images"
import "./TodoList.css"

const TodoList = ({ todos, setTodos, setEditTodo }) => {

    useEffect(() => {
        fetch('http://localhost:5000/todo')
        .then(res => res.json())
        .then(data => setTodos(data))
    }, [setTodos])

    const handleComplete = (todo) => {
        fetch('http://localhost:5000/completed', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ todo })
        })
        .then(res => res.json())
        .then(data => {
            setTodos(
                todos.map((item) => {
                    if(item.id === todo.id) {
                        return { ...item, completed: !item.completed };
                    }
                    return item;
                })
            )
        })
    };

    const handleEdit = ({id}) => {
        fetch('http://localhost:5000/edit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id })
        })
        .then(res => res.json())
        .then(data => {
            const findTodo = todos.find((todo) => todo.id === id);
            setEditTodo(findTodo);
        });
    };

    const handleDelete = ({id}) => {
        fetch('http://localhost:5000/delete', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.ok) throw new Error ('Request did not work');
            const index = todos.findIndex(todo => todo.id !== id);
            todos.splice(index,1);
        });
    };

    return(
        <div className="list" >
            {todos.map((todo) => (
                <li className="list-item" key={todo.id}> 
                    <input
                        id="todos"
                        type="text"
                        value={todo.title}
                        className={`list ${todo.completed ? "complete" : ""}`}
                        onChange={(event) => event.preventDefault()}
                    /> 
                     <div className="buttons">
                        <button className="btn-complete task-button" onClick={() => handleComplete(todo)}>
                            <img id="completeImg" alt="completeImg" src={images.complete}></img>
                        </button>
                        <button className="btn-edit task-button" onClick={() => handleEdit(todo)}>
                            <img id="editImg" alt="editImg" src={images.edit}></img>
                        </button>
                        <button className="btn-delete task-button" onClick={() => handleDelete(todo)}>
                            <img id="deleteImg" alt="deleteImg" src={images.bin}></img>
                        </button>
                    </div> 
                </li>
            ))}
        </div>
    )
}

export default TodoList;