// *** Variables ***
var plusImg = document.querySelector('.form__div--img')
var form = document.querySelector('form')
var taskList = document.querySelector('ul')
var taskItemInput = document.querySelector('.form__div--input')
var deleteImg = document.querySelector('.ul__li--img')
var makeTaskListBtn = document.querySelector('.form__btn--task')
var tasksArray = [];

// *** Event Listeners ***
plusImg.addEventListener('click', addTask)
form.addEventListener('click', removeTask)


// *** Functionality ***

function addTask(event) {
  if (event.target.className === 'form__div--img' && taskItemInput.value !== '') {
    var task = taskItemInput.value
  taskList.insertAdjacentHTML('beforeend', `<li class="ul__li" ><img class="ul__li--img" src="images/delete.svg" alt="delete img icon">${task}</li>`)
  }
  clearTaskInput()
}

function removeTask(event) {
  if (event.target.className === 'ul__li--img') {
    event.target.parentNode.remove();
  }
}

function clearTaskInput() {
  taskItemInput.value = ''
}


// A new card with the provided title and tasks should appear in the todo list.
//Design Card