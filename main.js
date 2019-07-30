// *** Variables ***
var form = document.querySelector('form')
var taskTitleInput = document.querySelector('#title')
var taskList = document.querySelector('ul')
var taskItemInput = document.querySelector('.form__div--input')
var plusBtn = document.querySelector('.form__div--plusbtn')
var deleteImg = document.querySelector('.ul__li--img')
var makeTaskListBtn = document.querySelector('.form__btn--maketasklist')
var clearBtn = document.querySelector('.form__btn--clear')
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
taskTitleInput.addEventListener('keyup', disableClearBtn)
makeTaskListBtn.addEventListener('click', handleMakeTaskListBtn)
clearBtn.addEventListener('click', handleClearBtn)
cardSection.addEventListener('click', handleToDoListCardBehavior)

// *** Functionality | Handlers 1st ***
function handlePageLoad() {
  checkToDoListStorage();
  // persistToDoList(toDoListArray);
  appendToDoList();
  // createNewToDoList();
  disablePlusBtn();
  disableMakeTaskListButton();
  disableClearBtn();
}

function handleMakeTaskListBtn() {
  finalizeToDoList();
  // createNewToDoList(); //this pushes two with [0] empty
}

function handlePlusBtn() {
  addTaskToDom();
}

function handleClearBtn() {
  clearTitleInput();
  clearTasksFromDOM();
  disableClearBtn();
}

function handleToDoListCardBehavior() {
  toggleCheckBoxImg(event);
}

function checkToDoListStorage() {
  if (JSON.parse(localStorage.getItem('toDoList')) === null) {
    toDoListArray = [];
  } else {
    toDoListArray = JSON.parse(localStorage.getItem('toDoList')).map(element => {
      return new ToDoList(element);
    })
  }
}

function appendToDoList() {
  for (var index = 0; index < toDoListArray.length; index++) {
    createToDoListCard(toDoListArray[index])
  }
}

function disableClearBtn() {
  var nodes = Array.from(document.querySelector('.form__ul').childNodes);
  if (taskTitleInput.value === '' || nodes.length > 0) {
    clearBtn.disabled = true;
  } else {
    clearBtn.disabled = false;
  }
}

function disablePlusBtn() {
  if (taskTitleInput.value === '' || taskItemInput.value === '') {
    plusBtn.disabled = true;
  } else {
    plusBtn.disabled = false;
  }
}

function disableMakeTaskListButton() {
  var nodes = Array.from(document.querySelector('.form__ul').childNodes);
  if (taskTitleInput.value === '' || nodes.length === 0) {
    makeTaskListBtn.disabled = true;
  } else {
    makeTaskListBtn.disabled = false;
  }
}

function clearTitleInput() {
  taskTitleInput.value = '';
}

function clearItemInput() {
  taskItemInput.value = '';
}

function clearTasksFromDOM() {
  var nodes = Array.from(document.querySelector('.form__ul').childNodes);
  nodes.forEach(node => {
    node.remove();
  })
}

function createNewToDoList() {
  var newToDoList = new ToDoList({title: taskTitleInput.value});
  toDoListArray.push(newToDoList)
}

//***DELETE function createNewTask
// function createNewTask(newToDoList) {
//   var task = new ToDoTask({text: taskItemInput.value});

//   addTaskToDom(event, task)
//   newToDoList.addTask(task)
// }
///****

function addTaskToDom() {
  if (event.target.className === 'form__div--plusbtn' && taskItemInput.value !== '') {
    var taskObject = {id: Date.now(), 
                      text: taskItemInput.value, 
                      complete: false}
  taskList.insertAdjacentHTML('beforeend', `<li class="ul__li" data-id="${taskObject.id}"><img class="ul__li--deleteimg" src="images/delete.svg" alt="delete img icon">${taskObject.text}</li>`)
  }
  clearItemInput();
  disablePlusBtn();
}

function deleteTask(event) {
  if (event.target.className === 'ul__li--deleteimg') {
    var currentToDoList = toDoListArray.length - 1
    event.target.parentNode.remove();
    taskObject = findTaskObject(event, currentToDoList, '.ul__li')
    toDoListArray[currentToDoList].removeTask(taskObject.id)
  }
  disableMakeTaskListButton();
}

function createTaskArray() {
  var toDoTasks = document.querySelectorAll('.ul__li');
  var toDoTasksArray = Array.from(toDoTasks);
  var tasks = toDoTasksArray.map(task => {
    return {id: task.dataset.id, 
            text: task.innerText, 
            completed: false}
  })
  return tasks;
}

function finalizeToDoList() {
  var taskObjects = createTaskArray();
  var currentToDoList = new ToDoList ({
    id: Date.now(),
    title: taskTitleInput.value,
    tasks: taskObjects
  });
  toDoListArray.push(currentToDoList);
  currentToDoList.saveToStorage(toDoListArray);
  createToDoListCard(currentToDoList)
  clearTasksFromDOM(currentToDoList);
  clearTitleInput();
  clearItemInput();
  disableClearBtn();
}
//****************

function findTaskIndex(event, currentToDoList, className) {
  var taskIdentity = event.target.closest(className).dataset.id
  var taskIndex = toDoListArray[currentToDoList].tasks.findIndex(taskObj => {
    return parseInt(taskIdentity) === parseInt(taskObj.id);
  })
  return taskIndex
}   

function findTaskObject(event, currentToDoList, className) {
  var taskIndex = findTaskIndex(event, currentToDoList, className)
  var taskObject = toDoListArray[currentToDoList].tasks[taskIndex] 
  return taskObject
}

function findToDoIndex(event, toDoListArray, className) {
  var toDoIdentity = event.target.closest(className).dataset.id
  var toDoIndex = toDoListArray.findIndex(toDoObj => {
    return parseInt(toDoIdentity) === toDoObj.id
  })
  return toDoIndex
}

//*** DELETE?
// function findToDoObject(event, toDoListArray, className) {
//   var toDoListIndex = findToDoIndex(event, toDoListArray, className)
//   var toDoListObject = toDoListArray[toDoListIndex]
//   return toDoListObject
// }
//*** DELETE?


function createToDoListCard(currentToDoList) {

  // console.log("CheckBoxIMG")
  cardSection.insertAdjacentHTML('afterbegin', `<article data-id="${currentToDoList.id}">
          <header class="article__header">
            <h2>${currentToDoList.title}</h2>
          </header>
          <ul class="article__ul">
            ${currentToDoList.tasks.map(function (task){
                var checkBoxImg = task.completed ? 'images/checkbox-active.svg' : 'images/checkbox.svg'
              return `<li class="article__ul--li" data-id="${task.id}"><img class="article__ul--checkboximg" src="${checkBoxImg}" alt="checkbox img icon">${task.text}</li>`
              }).join('')}
          </ul>
          </ul>
          <footer class="article__footer">
            <img class="article__footer--urgent" src="images/urgent.svg" alt="urgent img icon">
            <img class="article__footer--delete" src="images/delete.svg" alt="delete img icon">
          </footer>
        </article>`)
}

function toggleCheckBoxImg(event) {
  if(event.target.parentNode.className === 'article__ul--li') {
    var currentToDoListIndex = findToDoIndex(event, toDoListArray, 'article')
    var currentToDoList = toDoListArray[currentToDoListIndex]
    var taskIndex = findTaskIndex(event, currentToDoListIndex, '.article__ul--li')
    var taskObject = currentToDoList.tasks[taskIndex]
    currentToDoList.completeTask(taskObject)
    var checkBoxImg = taskObject.completed ? 'images/checkbox-active.svg' : 'images/checkbox.svg'
    console.log(checkBoxImg)
    event.target.setAttribute('src', checkBoxImg)
    console.log(currentToDoList instanceof ToDoList)
    currentToDoList.updateTask(currentToDoList)
  }
}

//DELETE?
// function returnToDoListTasks(currentToDoList) {
//   currentToDoList.tasks.map(function (task){
//     return `<li>${task.text}</li>`
//   }).join('')
// }
//DELETE?