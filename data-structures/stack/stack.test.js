function createStack(max) {
  // build your stack object and its methods inside this factory function
  const stack = {
    quantity: 0,
    storage: {},
    maxSize: max,
    push,
    pop,
    isEmpty,
    isFull,
    peek
  };

  return stack;
}

function push(fruit) {
  const index = (this.quantity += 1);
  this.storage[index] = fruit;
}

function pop() {
  if (!Object.keys(this.storage)) return;
  const deleted = this.storage[this.quantity];
  console.log("deleted", deleted);
  delete this.storage[this.quantity];
  return deleted;
}

function isEmpty() {
  if (!Object.keys(this.storage).length) return true;
  return false;
}

function isFull() {
  consolee.log(this.quantity);
  return this.quantity >= this.maxSize ? true : false;
}

function peek() {
  const keys = Object.keys(this.storage);
  //edge case
  if (!keys.length) return "nothing in the storage"
  return this.storage[keys.length]; // can't guarantee
}


module.exports = { createStack, push, pop, isEmpty, isFull, peek };
