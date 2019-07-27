class ToDoTask {
  constructor(task) {
    this.id = task.id || Date.now();
    this.text = task.text;
    this.completed = task.completed || false;
  }
}