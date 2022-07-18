import { useEffect } from 'react';
import images from "../assets/images"
import "./TodoList.css"

const TodoList = ({ todos, setTodos, setEditTodo }) => {

    const fetchTodos = () => {
        fetch('http://localhost:5000/todo')
                .then(res => res.json())
                .then(data => setTodos(data))
    };
        
    useEffect(() => { fetchTodos() }, [setTodos]);

    const handleComplete = (todo) => {
        fetch('http://localhost:5000/completed', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: todo.id})
        })
        .then(res => res.json())
        .then(data => {
            fetchTodos();
            setTodos(
                todos.map((item) => {
                    if(item.id === todo.id) {
                        return { ...item, completed: !item.completed };
                    }
                    return item;
                })
            );
        });
    };

    const handleEdit = ({id}) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);
    };

    const handleDelete = () => {
        fetch('http://localhost:5000/todo/:id', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            if (!data.ok) throw new Error ('Request did not work');
            fetchTodos();
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