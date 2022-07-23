const { readFileSync } = require('fs');

let loadList = () => JSON.parse(readFileSync('todolist.json'));

module.exports = {loadList};
