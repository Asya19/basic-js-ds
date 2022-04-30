const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */

class Node {
  constructor(element, prev) {
    this.element = element;
    this.prev = prev; // ссылка на следующий элемент списка
  }
}

class Stack {
  constructor() {
    this.last = null; // ссылка на последний узел списка
  }

  push(element) {
    // теперь ссылка на последний узел указывает на новый узел
    this.last = new Node(element, this.last);
  }

  pop() {
    let res;
    // если список не пуст
    if (this.last !== null) { 
      res = this.last.element; // получаем последний узел
      this.last = this.last.prev; // сдвигаем указатель на предыдущий элемент
    }
    return res; // возразщаем удаленный элемент
  }

  peek() {
    return this.last.element; // возразщаем последний элемент
  }
}
// const stack = new Stack();

// console.log(stack);
// stack.push(1);
// stack.push(4);
// console.log(stack);

// console.log(stack.pop());
// console.log(stack.peek());

module.exports = {
  Stack
};
