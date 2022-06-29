import { useState, useEffect } from 'react';
import images from "../assets/images"
import "./TodoList.css"

const TodoList = ({ todos, setTodos, setEditTodo }) => {

    useEffect(() => {
        fetch('http://localhost:5000/todo')
        .then(res => res.json())
        .then(data => setTodos(data))
    }, [setTodos])

    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if(item.id === todo.id) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            })
        );
    };

    const handleEdit = ({id}) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);
    };

    const handleDelete = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };


    return(
        <div style={{
            width: '50%',
            height: 'auto',
            margin: 'auto',
            marginTop: '10px',
            padding: '25px 25px',
            borderRadius: '10px',
            backgroundColor: '#e8dae4',
            border: '2px solid #7a7585'
        }}>
            {todos.map((todo) => (
                <li className="list-item" key={todo.id}> 
                    {/* <ul className="notes">{todo.note}</ul> */}
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