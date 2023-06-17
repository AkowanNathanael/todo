// Todo item count list number
var counter=1;
var todosElement=document.getElementById("todos");
var numofElement=document.getElementById("numofel")
var TodosElementCounts=todosElement.childElementCount;
numofElement.innerHTML=TodosElementCounts +"&nbsp;";

function trackTodosItems(){
TodosElementCounts=todosElement.childElementCount;
console.log(todosElement.childElementCount)
numofElement.innerHTML=TodosElementCounts +"&nbsp;";

}

var trace;  // for debugging 
function Btnlogic(e){
    trace=e;
    if (e.classList.contains("not")==false){
        // console.log(e)
        // track done task (checked task int in todos) that is todos-items
        // Also add class done or un done to parenet element
        if(e.checked==true){
            numofElement.innerHTML=--TodosElementCounts +"&nbsp;" ;
            e.parentElement.parentElement.classList.add("task-done")
            console.log(e.parentElement.parentElement)
        }else {
            numofElement.innerHTML=++TodosElementCounts  +"&nbsp";
            e.parentElement.parentElement.classList.remove("task-done")
            console.log( e.parentElement.parentElement)
        }
        e.checked==true? e.nextElementSibling.style.textDecoration="line-through" : e.nextElementSibling.style.textDecoration="none";
        // console.log(e.nextElementSibling.style.textDecoration="line-through")
    }
        // check if target is not todos element
        if(e.classList.contains("not")){
            console.log(e.checked);
            AddTodo(e);
        }
}


// controls add close button icon that is  removing close button icon or vice versa onhover
function formCheckEnter(e){
    e.lastElementChild.classList.remove("hideme");
}
function formCheckLeave(e){
    e.lastElementChild.classList.add("hideme");
}



// todo close btn
function closebtn (e) { 
//  console.log(e.parentElement.parentElement)
 e.parentElement.parentElement.remove()
//  TodosElementCounts=todosElement.childElementCount;
// numofElement.innerHTML=TodosElementCounts +"&nbsp;";
trackTodosItems()

}

//  toggle darkmode
var toggleDarkModeIcon=document.getElementById("darkmode");
toggleDarkModeIcon.addEventListener("click",(e)=>{
    console.log(e.target.src)
    if(e.target.src.endsWith("/images/icon-moon.svg")){
        e.target.src="./images/icon-sun.svg";
        console.log("in darkmode")
        document.body.style.backgroundColor="#181824"
        var body=document.querySelector(".bg-image")
        body.style.backgroundImage="url(./images/bg-desktop-dark.jpg)";
        var todoitems= document.querySelectorAll(".todo-items");
        todoitems.forEach((index)=> {
            index.style.backgroundColor="#25273C"
            index.style.color="white"
            index.style.borderBottom="1px solid grey"
            index.style.boxShadow="none"

            // console.log(index);
        })
      
    }else {
        e.target.src="./images/icon-moon.svg";
        // e.target.src=="./images/icon-moon.svg";
        console.log("in light")
        document.body.style.backgroundColor="#FAFAFA"
        var body=document.querySelector(".bg-image")
        body.style.backgroundImage="url(./images/bg-desktop-light.jpg)";
        var todoitems= document.querySelectorAll(".todo-items");
        todoitems.forEach((index)=> {
            index.style.backgroundColor="#FAFAFA";
            index.style.color="black";
            index.style.boxShadow="3px 3px 70px 1px rgb(218, 212, 212)"
            index.style.borderBottom="1px solid rgb(218, 204, 204)"
            // console.log(index);
        })
      

    }
})


// 
// const inputEL = document.getElementById("search")
function AddTodo(checkbox) {
    if (checkbox.checked) {
      const inputValue = document.getElementById("search").value;
      const todosDiv = document.getElementById("todos");
  
      const newTodoItem = document.createElement("div");
      newTodoItem.classList.add("todo-items");
  
      const todoContent = document.createElement("div");
      todoContent.classList.add("form-check");
      todoContent.onmouseenter=function(){
        formCheckEnter(this);
      }
      todoContent.onmouseleave=function(){
        formCheckLeave(this);
      }
  
      const todoCheckbox = document.createElement("input");
      todoCheckbox.classList.add("form-check-input");
      todoCheckbox.setAttribute("type", "checkbox");
      todoCheckbox.onclick=function(){
        Btnlogic(this)
      }
  
      const todoLabel = document.createElement("label");
      todoLabel.classList.add("form-check-label");
      todoLabel.textContent = inputValue;
  
      const todoCloseBtn = document.createElement("span");
      todoCloseBtn.classList.add("float-right", "hideme");
      todoCloseBtn.onclick=function(){
        closebtn(this)
      }
  
      const todoCloseImg = document.createElement("img");
      todoCloseImg.setAttribute("src", "./images/icon-cross.svg");
      todoCloseImg.setAttribute("alt", "");
  
      todoCloseBtn.appendChild(todoCloseImg);
      todoContent.appendChild(todoCheckbox);
      todoContent.appendChild(todoLabel);
      todoContent.appendChild(todoCloseBtn);
      newTodoItem.appendChild(todoContent);
      todosDiv.appendChild(newTodoItem);
  
      // Clear the input value
      document.getElementById("search").value = "";
    }
    // track todos items total number
    // TodosElementCounts=todosElement.childElementCount
    // numofElement.innerHTML=TodosElementCounts +"&nbsp;";
    trackTodosItems()
  }
  


// 
// 
// 
// 
// Get references to the buttons and todos container
const allButton = document.getElementById('all');
const completedButton = document.getElementById('completed');
const activeButton = document.getElementById('active');
const clearCompletedButton = document.getElementById('clear-completed');
const todosContainer = document.querySelector('.todos');

// Add event listeners to the buttons
allButton.addEventListener('click', showAllTodos);
completedButton.addEventListener('click', showCompletedTodos);
activeButton.addEventListener('click', showActiveTodos);
clearCompletedButton.addEventListener('click', clearCompletedTodos);

// Function to list all children in the todos container
function showAllTodos() {
  // Reset the display of all todos
  resetTodoDisplay();

  // Show all todos
  const todos = todosContainer.children;
  for (let i = 0; i < todos.length; i++) {
    todos[i].style.display = 'block';
  }
}

// Function to list all checked todos
function showCompletedTodos() {
  // Reset the display of all todos
  resetTodoDisplay();

  // Show only completed todos
  const todos = todosContainer.children;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].querySelector('input[type="checkbox"]').checked) {
      todos[i].style.display = 'block';
    }
  }
}

// Function to list all todos with unchecked input
function showActiveTodos() {
  // Reset the display of all todos
  resetTodoDisplay();

  // Show only active todos
  const todos = todosContainer.children;
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].querySelector('input[type="checkbox"]').checked) {
      todos[i].style.display = 'block';
    }
  }
}

// Function to remove all completed todos
function clearCompletedTodos() {
  const todos = todosContainer.children;
  const completedTodos = [];

  // Find completed todos
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].querySelector('input[type="checkbox"]').checked) {
      completedTodos.push(todos[i]);
    }
  }

  // Remove completed todos
  completedTodos.forEach(todo => {
    todosContainer.removeChild(todo);
  });
}

// Function to reset the display of all todos
function resetTodoDisplay() {
  const todos = todosContainer.children;
  for (let i = 0; i < todos.length; i++) {
    todos[i].style.display = 'none';
  }
}
