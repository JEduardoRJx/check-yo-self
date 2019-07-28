// *** Variables ***
var form = document.querySelector('form')
var taskTitleInput = document.querySelector('#title')
var taskList = document.querySelector('ul')
var taskItemInput = document.querySelector('.form__div--input')
var plusBtn = document.querySelector('.form__div--plusbtn')
var deleteImg = document.querySelector('.ul__li--img')
var makeTaskListBtn = document.querySelector('.form__btn--task')
var cardSection = document.querySelector('section')
var toDoListArray = [];


// *** Event Listeners ***
window.addEventListener('load', handlePageLoad)
// plusBtn.addEventListener('click', handlePlusBtn)
// plusBtn.addEventListener('click', removeTask)
taskItemInput.addEventListener('keyup', disablePlusBtn)

makeTaskListBtn.addEventListener('click', handleMakeTaskListBtn)

// *** Functionality | Handlers 1st ***
function handlePageLoad() {
  disablePlusBtn();
}

function handleMakeTaskListBtn() {
  createNewToDoList();
  // finalizeToDoList();
}

function handlePlusBtn() {
  createNewTask();
}

function disablePlusBtn() {
  taskItemInput.value === '' ? plusBtn.disabled = true : plusBtn.disabled = false;
}

function createNewToDoList() {
  var newToDoList = new ToDoList({title: taskTitleInput.value});
  toDoListArray.push(newToDoList)
  createNewTask(newToDoList);
}

function createNewTask(newToDoList) {
  var task = new ToDoTask({text: taskItemInput.value});
  addTaskToDom(event, task)
  console.log('first', newToDoList)
  newToDoList.addTask(task)
  console.log('second', newToDoList)
  // return itemObj
}

function addTaskToDom(event, task) {
  if (event.target.className ==='form__div--plusimg' && taskItemInput.value !== '') {
  taskList.insertAdjacentHTML('beforeend', `<li class="ul__li" ><img class="ul__li--deleteimg" src="images/delete.svg" alt="delete img icon">${task.text}</li>`)
  }
  clearTaskInput();
}

function removeTask(event) {
  if (event.target.className === 'ul__li--deleteimg') {
    event.target.parentNode.remove();
  }
}

function clearTaskInput() {
  taskItemInput.value = ''
}

function finalizeToDoList() {
  var currentToDoList = toDoListArray[0];
  currentToDoList.addTitle(taskTitle.value);
  // currentToDoList.saveToStorage();

  // console.log(newTask)
  // console.log(toDoListArray)
  createToDoListCard(currentToDoList);
  //create a newToDoList and add it to the array
}


function createToDoListCard(newToDoList) {
// const tasks = newToDoList.tasks
cardSection.insertAdjacentHTML('afterbegin', `<article>
          <header class="article__header">
            <h2>${newToDoList.title}</h2>
          </header>
          <ul class="article__ul">
          
            <li class="article__ul--li"></li>
            </ul>
          </ul>
          <footer class="article__footer">
            <img class="article__footer--urgent" src="images/urgent.svg" alt="urgent img icon">
            <img class="article__footer--delete" src="images/delete.svg" alt="delete img icon">
          </footer>
        </article>`)
}