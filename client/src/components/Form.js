import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";


const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {

    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) => 
            todo.id === id ? { title, id, completed } : todo
        );
        setTodos(newTodo);
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
        setTodos([...todos, {id: uuidv4(), title: input, completed: false}]);
        setInput("");
    } else {
        updateTodo(input, editTodo.id, editTodo.completed);
    };
    };


    return(
        <form onSubmit={onFormSubmit}
            style={{
            width: '50%',
            margin: 'auto',
            marginTop: '50px',
            padding: '25px 25px',
            borderRadius: '10px',
            backgroundColor: '#7a7585',
            display: 'flex',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent: 'space-between'
        }}>
            <input
                type="text"
                placeholder="Enter a todo..."
                className="task-input"
                value={input} required
                onChange={onInputChange}
                style={{
                    width: '80%',
                    height: 20,
                    outline: 'none',
                    backgroundColor: '#e8dae4',
                    color: '#7a7585',
                    borderRadius: '5px',
                    border: '1px solid #aba4b5',
                    fontWeight: 'bold',
                }}
                
            />
            <button className="button-add" type="submit"
                style={{
                    width: '15%',
                    height: 25,
                    borderRadius: '5px',
                    backgroundColor: '#e8dae4',
                    border: '1px solid #aba4b5', 
                    color: '#7a7585',
                    fontWeight: 'bold'
                }}>
                {editTodo ? "OK" : "Add"}
            </button>
        </form>
    )
}

export default Form;