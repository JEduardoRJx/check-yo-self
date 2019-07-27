class todoItem {
  constructor(itemObj) {
    this.id = itemObj.id || Date.now();
    this.text = itemObj.text;
    this.completed = itemObj.completed || false;
  }
}