const express = require('express');
const app = express();
const port = 5000;
const {loadList} = require('./todolist');
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.get('/todo', (req, res) => {
    res.send(loadList());
});

app.post('/edit', (req, res) => {
    const editedTodo = {
        id: req.body.id,
        title: req.body.title};
    const todoList = loadList();
    // const index = todoList.findIndex(i => i.id === id);
    // todoList.slice(index, 1, editedTodo);
    console.log(editedTodo);
    fs.writeFileSync('todolist.json', JSON.stringify(todoList, null, 2));
    res.send({ok: true});
});

// app.post('/edit', (req, res) => {
//     const editedTodo = {
//         id: uuid.v4(),
//         title: req.body.title
//     };
//     const todoList = loadList();
//     todoList.push(editedTodo);
//     console.log(todoList);
//     fs.writeFileSync('todolist.json', JSON.stringify(todoList, null, 2));
//     res.send({ok: true});
// });


app.post('/create', (req, res) => {
    const newTodo = {
        id: uuid.v4(),
        title: req.body.title
    };
    const todoList = loadList();
    todoList.push(newTodo);
    console.log(todoList);
    fs.writeFileSync('todolist.json', JSON.stringify(todoList, null, 2));
    res.send({ok: true});
});

app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    const todoList = loadList();
    const index = todoList.findIndex(i => i.id === id);
    todoList.splice(index, 1);
    console.log(todoList);
    fs.writeFileSync('todolist.json', JSON.stringify(todoList, null, 2));
    res.send({ ok: true })
});

app.listen(port, () => console.log(`Server running on port ${port}`));