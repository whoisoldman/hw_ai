const fs = require('fs');

/**
 * Считывает список задач из storage.json.
 * Возвращает [] если файла нет или он пустой/некорректный.
 */
function readTodos() {
  try {
    const data = fs.readFileSync('./storage.json', 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

/**
 * Очищает задачи, перезаписывая storage.json пустым массивом.
 */
function clearTodoItems() {
  fs.writeFile('./storage.json', '[]', 'utf8', (err) => {
    if (err) {
      return;
    }
    console.log('Data cleared from storage.json');
  });
}

/**
 * Добавляет задачу в storage.json.
 * @param {Object} todo
 */
function addTodoItem(todo) {
  const todos = [];
  fs.readFile('./storage.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        const jsonData = JSON.parse(data);
        todos.push(...jsonData);
      } catch (_) {}
    }
    todos.push(todo);
    fs.writeFile('./storage.json', JSON.stringify(todos), 'utf8', (wErr) => {
      if (wErr) {
        return;
      }
      console.log('Data saved to storage.json');
    });
  });
}

/**
 * Удаляет задачу из файла storage.json по идентификатору.
 *
 * @param {string|number} taskId - Идентификатор задачи для удаления.
 * @returns {void}
 *
 * @example
 * deleteTodoItem(3);
 * // => Удаляет задачу с id=3 из storage.json
 */
function deleteTodoItem(taskId) {
  const todos = [];
  fs.readFile('./storage.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        const jsonData = JSON.parse(data);
        todos.push(...jsonData);
      } catch (_) {}
    }
    const updatedTodos = todos.filter((todo) => String(todo.id) !== String(taskId));
    fs.writeFile('./storage.json', JSON.stringify(updatedTodos), 'utf8', (wErr) => {
      if (wErr) {
        return;
      }
      console.log('Task deleted from storage.json');
    });
  });
}

module.exports = {
  addTodoItem,
  clearTodoItems,
  readTodos,
  deleteTodoItem,
};
