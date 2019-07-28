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
plusBtn.addEventListener('click', handlePlusBtn)
// plusBtn.addEventListener('click', removeTask)
taskItemInput.addEventListener('keyup', disablePlusBtn)
taskTitleInput.addEventListener('keyup', disablePlusBtn)

makeTaskListBtn.addEventListener('click', handleMakeTaskListBtn)

// *** Functionality | Handlers 1st ***
function handlePageLoad() {
  disablePlusBtn();
  // disableMakeTaskListButton();
  createNewToDoList()
}

function handleMakeTaskListBtn() {
  // createNewToDoList();
  // finalizeToDoList();
}

function handlePlusBtn() {
  console.log('in HandlePlusBtn')
  createNewTask(toDoListArray[toDoListArray.length - 1]);
}

function disablePlusBtn() {
  // taskItemInput.value === '' && taskTitleInput.value === '' ? plusBtn.disabled = true : plusBtn.disabled = false;
  if (taskTitleInput.value === '' || taskItemInput.value === '') {
    plusBtn.disabled = true;
  } else {
    plusBtn.disabled = false;
  }
}

function disableTaskListButton() {
  //how to check if there are any objects in DOM?

}

function createNewToDoList() {
  var newToDoList = new ToDoList({title: taskTitleInput.value});
  toDoListArray.push(newToDoList)
  console.log(newToDoList)
  // createNewTask(newToDoList);
}

function createNewTask(newToDoList) {
  console.log('in createNewTask')
  var task = new ToDoTask({text: taskItemInput.value});
  console.log('in createNewTask', task)

  addTaskToDom(event, task)
  // console.log('first', newToDoList)
  newToDoList.addTask(task)
  // console.log('second', newToDoList)
}

function addTaskToDom(event, task) {
  console.log("in addTaskToDom")
  if (event.target.className === 'form__div--plusbtn' && taskItemInput.value !== '') {
  taskList.insertAdjacentHTML('beforeend', `<li class="ul__li" ><img class="ul__li--deleteimg" src="images/delete.svg" alt="delete img icon">${task.text}</li>`)
  }
  //Activate "Make Task List Button"
  // clearTaskInput();
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