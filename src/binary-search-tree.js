const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


class BinarySearchTree {
  constructor() {
    this._root = null; // у пустого дерева корень ссылается на null
  }

  root() {
    return this._root;
  }

  add(data) {
    function addWithIn(node, data) {

      // условие выхода
      if (!node) return new Node(data); 

      // если узел есть и там уже есть значение, которое мы хотим добавить - то ничего не делаем
      if (node.data === data) return node;

      // если значение, которое мы хотим добавить меньше, чем то, что в текущем узле
      // у этого узла левый потомок будет иметь то значение, котрое нам вернет метод addWithIn
      if (data < node.data)
        node.left = addWithIn(node.left, data);
      else
        node.right = addWithIn(node.right, data);

      return node; // возращаем текущий узел
    }
    this._root = addWithIn(this._root, data); // присваиваем в корень значение функции
  }

  has(data) {
    function searchWithIn(node, data) {
      if (!node) return false; // есть ли узел вообеще

      if (node.data === data) return true; // проверка, когда узле есть и равно ли его знчаение искомому

      // если в искомое значение меньше, чем в данном узле, то ищем в левом, инчае в правом
      return data < node.data ? searchWithIn(node.left, data) : searchWithIn(node.right, data);
    }
    return searchWithIn(this._root, data);
  }

  find(data) {
    function searchWithIn(node, data) {
      if (!node) return null; // есть ли узел вообеще

      if (node.data === data) return node; // проверка, когда узле есть и равно ли его знчаение искомому

      // если в искомое значение меньше, чем в данном узле, то ищем в левом, инчае в правом
      return data < node.data ? searchWithIn(node.left, data) : searchWithIn(node.right, data);
    }
    return searchWithIn(this._root, data);
  }

  remove(data) {
    // Метод принимаем поддерево и значение
    function removeNode(node, data) {
      // если узла нет, у него нет потомков, то мы так и оставляем
      if (!node) return null;

      // Определяем в какую сторону пойти. Если искомое меньше, то влево, инчае вправо
      if (data < node.data) {
        // удаляем из поддерева искомое значение. Полученное дерерво, без левого узла, положить в левое поддерево
        node.left = removeNode(node.left, data); 
        // возращаем текущий узел наверх, чтобы положить в корень дерева
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data); 
        return node;
      } else {
        // иначе искомое значение равно текущему
        // если у узла нет потомков, поэтому вместо него возращаем null
        if (!node.left && !node.right) return null;
        
        // если нет левого потомка
        if (!node.left) {
          node = node.right;
          return node;
        }

        // если правого потомка
        if (!node.right) {
          node = node.left;
          return node;
        }

        // ищем максимум среди правого потомка
        let maxFromLeft = node.left;

        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        node.data = maxFromLeft.data;

        node.left = removeNode(node.left, maxFromLeft.data);

        return node;
      }
    }
     //Удаление узла - передаем поддерево, в котором надо удалить и с каким значением
    // кладем в корень то, что получится по итогу. 
    this._root = removeNode(this._root, data);
  }

  min() {
    if (!this._root) return;

    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this._root) return;

    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }

}

module.exports = {
  BinarySearchTree
};