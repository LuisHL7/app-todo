//Referencias en el HTML

import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList    = document.querySelector(".todo-list");
const txtInput       = document.querySelector(".new-todo");
const btnBorrar      = document.querySelector(".clear-completed");
const ulFilters      = document.querySelector(".filters");
const anchorfilters  = document.querySelectorAll(".filtro");

export const createdTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completed ? "completed" : ""}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
			<label>${todo.task}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild); //Con esto evito que se muestre el div,
  //con esto se muestra debajo del <ul class="todo-list"> el <li>

  return div.firstElementChild;
};

//Events

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    console.log(txtInput.value);
    const newTodo = new Todo(txtInput.value);
    todoList.newTodo(newTodo);

    console.log(todoList);
    createdTodoHtml(newTodo);
    txtInput.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  const nameElement = event.target.localName; // input, label, button
  const todoElement = event.target.parentElement.parentElement; //nos devuelve el elemento padre, ponemos 2 para que nos devuelva el padre del padre que es <li>
  const todoId = todoElement.getAttribute("data-id");

  if (nameElement.includes("input")) {
    //click en el check
    todoList.tickCompleted(todoId);
    todoElement.classList.toggle("completed");
  } else if (nameElement.includes("button")) {
    todoList.deleteTodo(todoId);
    divTodoList.removeChild(todoElement);
  }
});

btnBorrar.addEventListener("click", () => {
  todoList.deleteCompleted();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const element = divTodoList.children[i];

    if (element.classList.contains("completed")) {
      divTodoList.removeChild(element);
    }
  }
});

ulFilters.addEventListener("click", (event) => {
  const filter = event.target.text;

  if (!filter) return;

  anchorfilters.forEach(element => element.classList.remove('selected'));
  event.target.classList.add('selected');

  for (const element of divTodoList.children) {
    element.classList.remove("hidden");
    const completed = element.classList.contains("completed");

    switch (filter) {
      case "Pendientes":
        if (completed) {
          element.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!completed) {
          element.classList.add("hidden");
        }
        break;
    }
  }
});
