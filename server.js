const express = require('express');
const app = express();
const port = 5000;
const {loadList} = require('./todolist');
const cors = require('cors');
const { writeFileSync } = require('fs');

app.use(cors());

app.get('/todo', (req, res) => {
    res.send(loadList());
})

app.post('/todo', (req, res) => {
    const newTodo = {
        title: req.body.title,
        id: uuid4()
    };
    loadList.push(newTodo);
    fs.writeFileSync('/todolist.json', JSON.stringify(output, null, 2));
    res.send(loadList());
    
})

app.listen(port, () => console.log(`Server running on port ${port}`));