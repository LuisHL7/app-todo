import './styles.css';
import { Todo, TodoList } from './classes'; //no es necesario poner index, porque po defecto busca el archivo index
import { createdTodoHtml } from './js/components';


export const todoList = new TodoList();

// todoList.todos.forEach(todo => createdTodoHtml(todo));
todoList.todos.forEach(createdTodoHtml); //método abreviado, solo sirve cuando es un parametro.


console.log( 'todos', todoList.todos);