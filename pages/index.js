import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import formValidator from "../components/FormValidator.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js"; 

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    //few adjustments needed
    const name = inputValues.name; 
    const dateInput = inputValues.date;
    const id = uuidv4();

    const values = { name, date: new Date(dateInput), id };
    const todo = generateTodo(values);
    todosList.append(todo);

    addTodoPopup.close();
    addTodoForm.reset();

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

  console.log("worked");
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos, //pass initial todos
  renderer: (data) => {
    const todo = generateTodo(data);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
 });
 
 addTodoCloseBtn.addEventListener("click", () => {
   addTodoPopup.close();
 });
 
const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

/*

  addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  //addTodoForm.reset();
});*/

const newTodoValidator = new formValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
