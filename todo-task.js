class ToDoTask {
  constructor(task) {
    this.id = task.id || Date.now();
    this.text = task.text;
    this.completed = this.completed || false;
  }

 completeTask() {
    this.completed = true;
  }
}