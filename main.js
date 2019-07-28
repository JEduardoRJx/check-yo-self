// *** Variables ***
var form = document.querySelector('form')
// var formUl = document.querySelector('.form__ul')
var taskTitleInput = document.querySelector('#title')
var taskList = document.querySelector('ul')
var taskItemInput = document.querySelector('.form__div--input')
var plusBtn = document.querySelector('.form__div--plusbtn')
var deleteImg = document.querySelector('.ul__li--img')
var makeTaskListBtn = document.querySelector('.form__btn--maketasklist')
var cardSection = document.querySelector('section')
var toDoListArray = [];


// *** Event Listeners ***
window.addEventListener('load', handlePageLoad)
plusBtn.addEventListener('click', handlePlusBtn)
form.addEventListener('click', deleteTask)
taskTitleInput.addEventListener('keyup', disablePlusBtn)
taskItemInput.addEventListener('keyup', disablePlusBtn)
taskTitleInput.addEventListener('keyup', disableMakeTaskListButton)
taskItemInput.addEventListener('keyup', disableMakeTaskListButton)
plusBtn.addEventListener('click', disableMakeTaskListButton)
makeTaskListBtn.addEventListener('click', handleMakeTaskListBtn)

// *** Functionality | Handlers 1st ***
function checkStorage() {
  if (JSON.parse(localStorage.getItem('toDoList')) === null) {
    toDoListArray = [];
  } else {
    toDoListArray = JSON.parse(localStorage.getItem('toDoList')).map(function(element) {
      return new ToDoList(element);
    })
  }
}

function appendLists() {
  for (var index = 0; index < toDoListArray.length; index++) {
    createToDoListCard(toDoListArray[index])
  }
}

function handlePageLoad() {
  checkStorage();
  appendLists();
  createNewToDoList();
  disablePlusBtn();
  disableMakeTaskListButton();
}

function handleMakeTaskListBtn() {
  finalizeToDoList();
  // createNewToDoList(); //this pushes two with [0] empty
}

function handlePlusBtn() {
  createNewTask(toDoListArray[toDoListArray.length - 1]);
}

function disablePlusBtn() {
  if (taskTitleInput.value === '' || taskItemInput.value === '') {
    plusBtn.disabled = true;
  } else {
    plusBtn.disabled = false;
  }
}

function disableMakeTaskListButton() {
  if (taskTitleInput.value === '' || toDoListArray[toDoListArray.length - 1].tasks.length === 0) {
    makeTaskListBtn.disabled = true;
  } else {
    makeTaskListBtn.disabled = false;
  }
}

function createNewToDoList() {
  var newToDoList = new ToDoList({title: taskTitleInput.value});
  toDoListArray.push(newToDoList)
  console.log(toDoListArray)
}

function createNewTask(newToDoList) {
  var task = new ToDoTask({text: taskItemInput.value});
  addTaskToDom(event, task)
  newToDoList.addTask(task)
}

function addTaskToDom(event, task) {
  if (event.target.className === 'form__div--plusbtn' && taskItemInput.value !== '') {
  taskList.insertAdjacentHTML('beforeend', `<li class="ul__li" data-id="${task.id}"><img class="ul__li--deleteimg" src="images/delete.svg" alt="delete img icon">${task.text}</li>`)
  }
  clearTaskItemInput();
  disablePlusBtn();
}

function deleteTask(event) {
  if (event.target.className === 'ul__li--deleteimg') {
    event.target.parentNode.remove();
    taskObject = findTaskObject(event)
    toDoListArray[toDoListArray.length - 1].removeTask(taskObject.id)
  }
  disableMakeTaskListButton();
}

function findTaskIndex(event) {
  var taskIdentity = event.target.closest('.ul__li').dataset.id
  var taskIndex = toDoListArray[toDoListArray.length - 1].tasks.findIndex(taskObj => {
    return parseInt(taskIdentity) === taskObj.id;
  })
  return taskIndex
}   

function findTaskObject(event) {
  var taskIndex = findTaskIndex(event)
  var taskObject = toDoListArray[toDoListArray.length - 1].tasks[taskIndex] 
  return taskObject
}

function findToDoIndex(event) {
  var toDoIdentity = event.target.closest('article').dataset.id
}


function clearTaskTitleInput() {
  taskTitleInput.value = '';
}

function clearTaskItemInput() {
  taskItemInput.value = '';
}


function finalizeToDoList() {
  var currentToDoList = toDoListArray[toDoListArray.length - 1];
  currentToDoList.addTitle(taskTitleInput.value);
  currentToDoList.saveToStorage(toDoListArray);
  createToDoListCard(currentToDoList);
  clearTaskTitleInput();
  clearTasksFromDOM(currentToDoList);
  createNewToDoList(event);
}

function clearTasksFromDOM(currentToDoList) {
  var nodes = Array.from(document.querySelector('.form__ul').childNodes);
  nodes.forEach(node => {
    node.remove();
  })
}


function createToDoListCard(currentToDoList) {
// const tasks = newToDoList.tasks
cardSection.insertAdjacentHTML('afterbegin', `<article data-id="${currentToDoList.id}">
          <header class="article__header">
            <h2>${currentToDoList.title}</h2>
          </header>
          <ul class="article__ul">
            ${currentToDoList.tasks.map(function (task){
              return `<li>${task.text}</li>`
              }).join('')}
          </ul>
          </ul>
          <footer class="article__footer">
            <img class="article__footer--urgent" src="images/urgent.svg" alt="urgent img icon">
            <img class="article__footer--delete" src="images/delete.svg" alt="delete img icon">
          </footer>
        </article>`)
}

function returnToDoListTasks(currentToDoList) {
  currentToDoList.tasks.map(function (task){
    return `<li>${task.text}</li>`
  }).join('')
}

function createTodoTask() {
  //You are setting and empty array to 'todotasks'
  localStorage.setItem('todoTasks', JSON.stringify([]));
}
