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
  appendToDoList();
  disablePlusBtn();
  disableMakeTaskListButton();
  disableClearBtn();
  showMessage(toDoListArray, 'Create A ToDo List!')
}

function handleMakeTaskListBtn() {
  finalizeToDoList();
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
  removeToDoListFromDOM(event);
  toggleUrgent(event);
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

function addTaskToDom() {
  if (event.target.className === 'form__div--plusbtn' && taskItemInput.value !== '') {
    var taskObject = {id: Date.now(), text: taskItemInput.value, complete: false}
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
    return {id: task.dataset.id, text: task.innerText, completed: false}
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
  showMessage(toDoListArray, 'Create A ToDo List!')
}

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

function createToDoListCard(currentToDoList) {
var urgentImg = currentToDoList.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg'
var articleUrgentClass = currentToDoList.urgent ? 'article__urgent' : 'article__noturgent'
var toggleUrgentClass = currentToDoList.urgent ? 'article__footer--urgent' : 'article__footer--noturgent'
  cardSection.insertAdjacentHTML('afterbegin', `<article class=${articleUrgentClass} data-id="${currentToDoList.id}">
          <header class="article__header">
            <h2>${currentToDoList.title}</h2>
          </header>
          <ul class="article__ul">
            ${currentToDoList.tasks.map(function (task){
                var toggleCheckBoxClass = task.completed ? 'article__ul--checkboximgcomplete' : 'article__ul--checkboximgincomplete'
                var checkBoxImg = task.completed ? 'images/checkbox-active.svg' : 'images/checkbox.svg'
              return `<li class="article__ul--li" data-id="${task.id}"><img class="${toggleCheckBoxClass}" src="${checkBoxImg}" alt="checkbox img icon">${task.text}</li>`
              }).join('')}
          </ul>
          </ul>
          <footer class="article__footer">
            <div class="article__footer--div">
            <img class="${toggleUrgentClass}" id="urgent" src="${urgentImg}">
            <p>URGENT</p>
            </div>
            <div class="article__footer--div">
            <img class="article__footer--delete" src="images/delete.svg" alt="delete img icon"> 
            <p>DELETE</p>
            </div>
          </footer>
        </article>`)
}

function toggleCheckBoxImg(event) {
  if(event.target.parentNode.className === 'article__ul--li') {
    var currentToDoListIndex = findToDoIndex(event, toDoListArray, 'article')
    var currentToDoList = toDoListArray[currentToDoListIndex]
    var taskIndex = findTaskIndex(event, currentToDoListIndex, '.article__ul--li')
    var taskObject = currentToDoList.tasks[taskIndex]
    currentToDoList.completeTask(taskObject);
    var checkBoxImg = taskObject.completed ? 'images/checkbox-active.svg' : 'images/checkbox.svg'
    var toggleCheckBoxClass = taskObject.completed ? 'article__ul--checkboximgcomplete' : 'article__ul--checkboximgincomplete'
    event.target.setAttribute('class', toggleCheckBoxClass)
    event.target.setAttribute('src', checkBoxImg)
    currentToDoList.saveToStorage(toDoListArray)
  }
}

function toggleUrgent(event) {
    var currentToDoListIndex = findToDoIndex(event, toDoListArray, 'article');
    var currentToDoListCard = event.target.closest('article')
    var currentToDoListObject = toDoListArray[currentToDoListIndex]
  if (event.target.id === 'urgent') {
    currentToDoListObject.markUrgent();
    var urgentImg = currentToDoListObject.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg'
    var articleUrgentClass = currentToDoListObject.urgent ? 'article__urgent' : 'article__noturgent'
    var toggleUrgentClass = currentToDoListObject.urgent ? 'article__footer--urgent' : 'article__footer--noturgent'
    event.target.setAttribute('src', urgentImg)
    event.target.parentNode.parentNode.parentNode.setAttribute('class', articleUrgentClass)
    event.target.setAttribute('class', toggleUrgentClass)
    currentToDoListObject.saveToStorage(toDoListArray)
  }
}

function removeToDoListFromDOM(event) {
  if (event.target.className === 'article__footer--delete') {
    toDoListCard = event.target.closest('article');
    toDoListIndex = findToDoIndex(event, toDoListArray, 'article')
    uncheckedTasks = toDoListCard.querySelectorAll('.article__ul--checkboximgincomplete').length
    var toDoListObject = toDoListArray[toDoListIndex]
    if (uncheckedTasks === 0) {
      toDoListCard.remove();
      toDoListObject.deleteFromStorage(toDoListIndex, toDoListArray)
      showMessage(toDoListArray, 'Create A ToDo List!')
    }
  }
}

function showMessage(array, message) {
  if (toDoListArray.length === 0) {
    cardSection.insertAdjacentHTML('afterbegin', `<p id='message'>${message}</p>`);
  } else {
    var newMessage = document.querySelector('#message');
    newMessage.remove();
  }
}

function clearToDoCards() {
  cardSection.innerHTML = '';
}

function keepToDoListCards(toDoListArray) {
  toDoListArray.forEach(currentToDoList => {
    createToDoListCard(currentToDoList);
  })
}