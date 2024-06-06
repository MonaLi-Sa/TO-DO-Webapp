document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Fetch existing todos from the backend and render them
  fetch('http://localhost:3000/api/todos')
    .then(response => response.json())
    .then(todos => {
      console.log('Fetched todos:', todos); // Log fetched todos
      todos.forEach(todo => {
        addTodoToDOM(todo);
      });
    })
    .catch(error => {
      console.error('Error fetching todos:', error); // Log fetch errors
    });

  // Handle form submission for adding a new todo
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    console.log('Form submitted with:', text); // Log form submission
    if (text !== '') {
      fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      })
      .then(response => response.json())
      .then(todo => {
        console.log('Added todo:', todo); // Log added todo
        addTodoToDOM(todo);
        todoInput.value = '';
        todoInput.focus();
      })
      .catch(error => {
        console.error('Error adding todo:', error); // Log add errors
      });
    }
  });

  // Function to add a todo item to the DOM
  function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Event handler for marking a todo as complete or incomplete
    li.querySelector('.complete-btn').addEventListener('click', () => {
      console.log('Complete button clicked for todo:', todo); // Log complete button click
      fetch(`http://localhost:3000/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !todo.completed })
      })
      .then(response => response.json())
      .then(updatedTodo => {
        console.log('Updated todo:', updatedTodo); // Log updated todo
        li.className = updatedTodo.completed ? 'completed' : '';
        li.querySelector('.complete-btn').textContent = updatedTodo.completed ? 'Undo' : 'Complete';
      })
      .catch(error => {
        console.error('Error updating todo:', error); // Log update errors
      });
    });

    // Event handler for deleting a todo
    li.querySelector('.delete-btn').addEventListener('click', () => {
      console.log('Delete button clicked for todo:', todo); // Log delete button click
      fetch(`http://localhost:3000/api/todos/${todo.id}`, {
        method: 'DELETE'
      })
      .then(() => {
        li.remove();
        console.log('Deleted todo:', todo); // Log deleted todo
      })
      .catch(error => {
        console.error('Error deleting todo:', error); // Log delete errors
      });
    });

    // Append the todo item to the list
    todoList.appendChild(li);
    console.log('Added todo to DOM:', todo); // Log DOM addition
  }
});
