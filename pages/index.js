import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import formValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js"; 

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name; 
    const dateInput = inputValues.date;
    const id = uuidv4();
    const completed = false; 

    const values = { name, date: new Date(dateInput), id };
    const todo = generateTodo(values);

    section.addItem(todo); 
    section.renderTodos();
    todoCounter.updateTotal(true);

    addTodoPopup.close();
    addTodoForm.reset();
    newTodoValidator.resetValidation(); 

  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed){
  todoCounter.updateCompleted(completed);
  console.log(completed);

} 

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }

  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodos = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const section = new Section({
  items: initialTodos, //pass initial todos
  renderer: renderTodos,
  containerSelector: ".todos__list",
});

section.renderItems();


addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
 });
 


const newTodoValidator = new formValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
