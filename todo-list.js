class ToDoList {
  constructor(listObj) {
    this.id = listObj.id || Date.now();
    this.title = listObj.title;
    this.urgent = listObj.urgent || false;
    //list tasks should be an array of ToDoItems
    this.tasks = listObj.tasks || [];
  }

  addTask(task) {
    this.tasks.push(task)
  }

  removeTask(taskId) {
    for(var index = 0; index < this.tasks.length; index++) {
      console.log("My task ID", taskId)
      if(this.tasks[index].id === taskId) {
        this.tasks.splice(index, 1);
      }
    }
  }

  addTitle(title) {
    this.title = title;
  }

  saveToStorage(tasksArray) {
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
    // localStorage.setItem('taskArr',)
  }

  deleteFromStorage() {

  }

  updateToDo() {

  }

  updateTask() {

  }
}