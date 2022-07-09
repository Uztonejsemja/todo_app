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
})

app.post('/edit', (req, res) => {
    res.json({
        id: req.params.id,
        title: req.params.title
    });
});

app.post('/create', (req, res) => {
    const newTodo = {
        title: req.body.title,
        id: uuid4()
    };
    let updatedList = loadList.push(newTodo);
    fs.writeFileSync('/todolist.json', JSON.stringify(updatedList, null, 2));
    res.send({ok: true});
})

app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    const todoList = loadList();
    const index = todoList.findIndex(i => i.id === id);
    todoList.splice(index, 1);
    console.log(todoList);
    fs.writeFileSync('todolist.json', JSON.stringify(todoList, null, 2));
    res.send({ ok: true })
})

app.listen(port, () => console.log(`Server running on port ${port}`));