// *** Variables ***
var form = document.querySelector('form')
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
function handlePageLoad() {
  createNewToDoList();
  disablePlusBtn();
  disableMakeTaskListButton();
}

function handleMakeTaskListBtn() {
  finalizeToDoList();
  // createNewToDoList();
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
  //how to check if there are any objects in DOM?
  // console.log(toDoListArray[toDoListArray.length - 1].tasks)
  if (taskTitleInput.value === '' || toDoListArray[toDoListArray.length - 1].tasks.length === 0) {
    makeTaskListBtn.disabled = true;
  } else {
    makeTaskListBtn.disabled = false;
  }
}

function createNewToDoList() {
  var newToDoList = new ToDoList({title: taskTitleInput.value});
  toDoListArray.push(newToDoList)
  console.log(newToDoList)
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
  console.log(currentToDoList)
  // currentToDoList.saveToStorage();
  createToDoListCard(currentToDoList);
  clearTaskTitleInput();
  //Clear DOM Function
  //create a newToDoList and add it to the array
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


// //Chris code
// function cardInstance(e) {
//   e.preventDefault();
//   //You setting todoTasks to an empty array by getting 'todoTasks' then parsing it aka todoTasks = []
//   var todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
//   //you are instantiating a new instance of the ToDoList class passing it
//   //the date.now, the Title, and an empty array
//   var taskCard = new ToDoList(Date.now(), titleInput.value, todoTasks);
//   //Then you are pushing that new Instance of the ToDoList class into the
//   //todoList Array
//   cardsArray.push(taskCard);
//   //You call saveToStorage on the new instance and pass it in the array to save it to storage
//   taskCard.saveToStorage(cardsArray);
//   //If 'todolistArray' is set to something
//   if (localStorage.getItem('todoListArray')) {
//     //invoke createtodoTask which sets a stringified empty array
//     createTodoTask();
//     //then remove the strinified array from storage
//     localStorage.removeItem('todoTasks');
//   }
//   //invoke generate card passing it the instance of todoList
//   generateCard(taskCard);
// }