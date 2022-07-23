const express = require('express');
const app = express();
const port = 5000;
const {loadList} = require('./todolist');
const cors = require('cors');
const fs = require('fs');
const uuid = require('uuid');

app.use(cors());
app.use(express.json());

app.get('/todo', (req, res) => {
    res.send(loadList());
});

app.put('/completed', (req, res) => {
    const id = req.body.id;
    const todoList = loadList();
    const index = todoList.findIndex(i => i.id === id);
    todoList[index].completed = !todoList[index].completed;
    fs.writeFileSync('todolist.json', JSON.stringify(todoList, null, 2));
    res.send({ok: true});
});

app.post('/edit', (req, res) => {
    const editedTodo = {
        id: req.body.id,
        title: req.body.title,
        completed: req.body.completed
    };
    const todoList = loadList();
    const index = todoList.findIndex(i => i.id === editedTodo.id);
    todoList.splice(index, 1, editedTodo);
    fs.writeFileSync('todolist.json', JSON.stringify(todoList, null, 2));
    res.send({ok: true});
});

app.post('/create', (req, res) => {
    const newTodo = {
        id: uuid.v4(),
        title: req.body.title,
        completed: false
    };
    const todoList = loadList();
    todoList.push(newTodo);
    fs.writeFileSync('todolist.json', JSON.stringify(todoList, null, 2));
    res.send({ok: true});
});

app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    const todoList = loadList();
    const index = todoList.findIndex(i => i.id === id);
    todoList.splice(index, 1);
    fs.writeFileSync('todolist.json', JSON.stringify(todoList, null, 2));
    res.send({ ok: true })
});

app.listen(port, () => console.log(`Server running on port ${port}`));