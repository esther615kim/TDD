const { max } = require('lodash');

function createQueue(max) {
    // build your stack object and its methods inside this factory function
    const queue = {
        maxSize: max,
        front: 1,
        back: 0,
        storage: new Map(),
        isEmpty,
        isFull,
        enQueue,
        deQueue,
        getQuantity,
        peek
    }
    return queue;
}

const func = createQueue();

function enQueue(item) {
    console.log(this.maxSize, this.back);
    if (this.back <= this.maxSize) return "fully loaded";
    const key = this.storage.size + 1;
    this.back = key; // assign it to back
    this.storage.set(key, item);
}

function deQueue() {
    if (!this.back) return;
    const deleted = this.storage.get(1);
    this.storage.delete(1);
    this.back -= 1;
}

function getQuantity() {
    return this.storage?.size;
}

function isEmpty() {
    return (!this.storage.size) ? true : false;
}

function isFull() {
    return this.storage.size >= this.maxSize ? true : false;
}

function peek() {
    console.log("peek", this.storage.get(1))
    return this.storage.get(1);
}

module.exports = { createQueue, enQueue, deQueue, getQuantity, isEmpty, isFull, peek };
