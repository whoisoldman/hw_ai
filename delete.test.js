const fs = require('fs');
const { deleteTodoItem } = require('./functions');

describe('deleteTodoItem', () => {
  beforeEach(() => {
    // Готовим исходные данные
    const mockData = [
      { id: 1, text: 'Task 1' },
      { id: 2, text: 'Task 2' },
    ];
    fs.writeFileSync('./storage.json', JSON.stringify(mockData));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('удаляет задачу по id из storage.json', async () => {
    deleteTodoItem(1);
    // даём времени асинхронной записи
    await new Promise((r) => setTimeout(r, 30));

    const updated = JSON.parse(fs.readFileSync('./storage.json', 'utf8'));
    expect(updated).toEqual([{ id: 2, text: 'Task 2' }]);
  });
});
