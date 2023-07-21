// Function to set the theme based on the cookie value
if(getCookie("theme")){
}else {setCookie("theme", "light", 30);} 
window.addEventListener("load", setThemeFromCookie);


function setThemeFromCookie() {
  const theme = getCookie("theme");
  const modeToggle = document.getElementById("darkmode");

  if (theme === "dark") {
    setDarkMode();
    modeToggle.setAttribute("data-mode", "dark");
  } else {
    setLightMode();
    modeToggle.setAttribute("data-mode", "light");
  }
}

// Function to toggle the theme and update the cookie value
function toggleTheme() {
  const modeToggle = document.getElementById("darkmode");
  var toggleDarkModeIcon = document.getElementById("darkmode");
  toggleDarkModeIcon.addEventListener("click", (e) => {
    console.log(e.target.src);
    if (e.target.src.endsWith("/images/icon-moon.svg")) {
      e.target.src = "./images/icon-sun.svg";
      console.log("in darkmode");
      document.body.style.backgroundColor = "#181824";
      var body = document.querySelector(".bg-image");
      body.style.backgroundImage = "url(./images/bg-desktop-dark.jpg)";
    } else {
      e.target.src = "./images/icon-moon.svg";
      console.log("in light");
      var body = document.querySelector(".bg-image");
      body.style.backgroundImage = "url(./images/bg-desktop-light.jpg)";
    }
  });

  if (modeToggle.getAttribute("data-mode") === "dark") {
    setLightMode();
    setCookie("theme", "light", 30);
    modeToggle.setAttribute("data-mode", "light");
  } else {
    setDarkMode();
    setCookie("theme", "dark", 30);
    modeToggle.setAttribute("data-mode", "dark");
  }
}

// Function to set the dark mode
function setDarkMode() {
  document.getElementById("theme-style").setAttribute("href", "dark_theme.css");
}

// Function to set the light mode
function setLightMode() {
  document.getElementById("theme-style").setAttribute("href", "app.css");
}

// Function to get the value of a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return "";
}

// Function to set a cookie with a given name, value, and expiration days
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Set the theme based on the cookie value when the page loads
setThemeFromCookie();

// Add event listener to the mode toggle button
document.querySelector("#darkmode").addEventListener("click", toggleTheme);

// Todo item count list number
var counter = 1;
var todosElement = document.getElementById("todos");
var numofElement = document.getElementById("numofel");
var TodosElementCounts = getStoredTodos().length;
numofElement.innerHTML = TodosElementCounts + "&nbsp;";

function trackTodosItems() {
  TodosElementCounts = getStoredTodos().length;
  numofElement.innerHTML = TodosElementCounts + "&nbsp;";
}

function newBtnLogic(event, e) {
  if (event.key === "Enter") {
    console.log("enter")
    AddTodoNew();
  }
}

function Btnlogic(e) {
  if (e.classList.contains("not") == false) {
    if (e.checked == true) {
      numofElement.innerHTML = --TodosElementCounts + "&nbsp;";
      e.parentElement.parentElement.classList.add("task-done");
    } else {
      numofElement.innerHTML = ++TodosElementCounts + "&nbsp;";
      e.parentElement.parentElement.classList.remove("task-done");
    }
    e.checked == true
      ? (e.nextElementSibling.style.textDecoration = "line-through")
      : (e.nextElementSibling.style.textDecoration = "none");
  }
}

function formCheckEnter(e) {
  e.lastElementChild.classList.remove("hideme");
}

function formCheckLeave(e) {
  e.lastElementChild.classList.add("hideme");
}

function closebtn(e) {
  e.parentElement.parentElement.remove();
  trackTodosItems();
}

function AddTodoNew() {
  const inputValue = document.getElementById("search").value;
  if (inputValue !== "") {
    const todo = {
      id: counter,
      content: inputValue,
      completed: false,
    };

    saveTodoToLocalStorage(todo);
    createTodoElement(todo);
    counter++;
    document.getElementById("search").value = "";
  }
  trackTodosItems();
}

function saveTodoToLocalStorage(todo) {
  const todos = getStoredTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getStoredTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function createTodoElement(todo) {
  const newTodoItem = document.createElement("div");
  newTodoItem.classList.add("todo-items");

  const todoContent = document.createElement("div");
  todoContent.classList.add("form-check");
  todoContent.onmouseenter = function () {
    formCheckEnter(this);
  };
  todoContent.onmouseleave = function () {
    formCheckLeave(this);
  };

  const checkmark = document.createElement("span");
  checkmark.classList.add("checkmark")

  const todoCheckbox = document.createElement("input");
  todoCheckbox.classList.add("form-check-input");
  todoCheckbox.classList.add("rounded-check");
  todoCheckbox.setAttribute("type", "checkbox");
  todoCheckbox.onclick = function () {
    Btnlogic(this);
    updateTodoStatus(todo);
  };

  const todoLabel = document.createElement("label");
  todoLabel.classList.add("form-check-label");
  todoLabel.textContent = todo.content;

  const todoCloseBtn = document.createElement("span");
  todoCloseBtn.classList.add("float-right", "hideme");
  todoCloseBtn.onclick = function () {
    closebtn(this);
    deleteTodoFromLocalStorage(todo);
  };

  const todoCloseImg = document.createElement("img");
  todoCloseImg.setAttribute("src", "./images/icon-cross.svg");
  todoCloseImg.setAttribute("alt", "");

  todoCloseBtn.appendChild(todoCloseImg);
  todoContent.appendChild(todoCheckbox);
  // todoContent.appendChild(checkmark);
  todoContent.appendChild(todoLabel);
  todoContent.appendChild(todoCloseBtn);
  newTodoItem.appendChild(todoContent);
  todosElement.appendChild(newTodoItem);
}

function deleteTodoFromLocalStorage(todo) {
  const todos = getStoredTodos();
  const filteredTodos = todos.filter((item) => item.id !== todo.id);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}

function updateTodoStatus(todo) {
  const todos = getStoredTodos();
  const updatedTodos = todos.map((item) => {
    if (item.id === todo.id) {
      item.completed = !item.completed;
    }
    return item;
  });
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function showAllTodos() {
  resetTodoDisplay();
  const todos = getStoredTodos();
  todos.forEach((todo) => {
    createTodoElement(todo);
  });

}

//   constHere's the remaining part of the `newapp.js` file, including the updated code for filtering and displaying todos:

// javascript
// Function to list all checked todos
function showCompletedTodos() {
  resetTodoDisplay();

  const todos = getStoredTodos();
  todos.forEach((todo) => {
    if (todo.completed) {
      createTodoElement(todo);
    }
  });
}

// Function to list all todos with unchecked input
function showActiveTodos() {
  resetTodoDisplay();

  const todos = getStoredTodos();
  todos.forEach((todo) => {
    if (!todo.completed) {
      createTodoElement(todo);
    }
  });
}

// Function to remove all completed todos
function clearCompletedTodos() {
  const todos = getStoredTodos();
  const filteredTodos = todos.filter((todo) => !todo.completed);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  resetTodoDisplay();
  trackTodosItems();
}

function resetTodoDisplay() {
  todosElement.innerHTML = "";
}

// Create a media query
var mediaQuery = window.matchMedia("screen and (max-width: 768px)");

// Check if the media query matches initially
if (mediaQuery.matches) {
  console.log("Media query matches");
  document.getElementById("controls").addClass = "todo-items";
}

// Listen for changes in the media query
mediaQuery.addListener(function (query) {
  if (query.matches) {
    console.log("Media query matches");
    document.getElementById("controls").classList.add("todo-items");
  } else {
    console.log("Media query doesn't match");
  }
});

// Set event listeners for the buttons
const allButton = document.getElementById("all");
const completedButton = document.getElementById("completed");
const activeButton = document.getElementById("active");
const clearCompletedButton = document.getElementById("clear-completed");

allButton.addEventListener("click", showAllTodos);
completedButton.addEventListener("click", showCompletedTodos);
activeButton.addEventListener("click", showActiveTodos);
clearCompletedButton.addEventListener("click", clearCompletedTodos);

// Display stored todos on page load
document.addEventListener("DOMContentLoaded", function () {
  const todos = getStoredTodos();
  todos.forEach((todo) => {
    createTodoElement(todo);
  });
  trackTodosItems();
})
