class ToDoList {
  constructor(listObj) {
    this.id = listObj.id || Date.now();
    this.title = listObj.title;
    this.urgent = listObj.urgent || false;
    this.tasks = listObj.tasks || [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  addTitle(title) {
    this.title = title;
  }

  completeTask(task) {
    task.completed = !task.completed;
  }

  deleteFromStorage(toDoListIndex, toDoListArray) {
    toDoListArray.splice(toDoListIndex, 1);
    this.saveToStorage(toDoListArray);
  }

  markUrgent() {
    this.urgent = !this.urgent;
  }

  removeTask(taskId) {
    for(var index = 0; index < this.tasks.length; index++) {
      if(this.tasks[index].id === taskId) {
        this.tasks.splice(index, 1);
      }
    }
  }

  saveToStorage(toDoListArray) {
    localStorage.setItem('toDoList', JSON.stringify(toDoListArray));
  }

  updateTask(currentToDoList, toDoListArray) {
    currentToDoList.saveToStorage(toDoListArray);
  }
}