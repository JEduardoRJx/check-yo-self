class ToDoList {
  constructor(listObj) {
    this.id = listObj.id || Date.now();
    this.title = listObj.title;
    this.urgent = listObj.urgent || false;
    this.tasks = listObj.tasks || [];
  }

  addTask(task) {
    this.tasks.push(task)
  }

  removeTask(taskId) {
    for(var index = 0; index < this.tasks.length; index++) {
      if(this.tasks[index].id === taskId) {
        this.tasks.splice(index, 1);
      }
    }
  }

  addTitle(title) {
    this.title = title;
  }

  saveToStorage(toDoListArray) {
    // toDoListArray.shift();
    localStorage.setItem('toDoList', JSON.stringify(toDoListArray));
  }

  completeTask(task) {
    task.completed = !task.completed
  }

  deleteFromStorage() {

  }

  updateToDo() {

  }

  updateTask(currentToDoList) {
    currentToDoList.saveToStorage(toDoListArray)
  }
}