const readline = require('readline');

class Node {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

// Function to convert an integer to a doubly linked list
function integerToLinkedList(n) {
  const isNegative = n < 0;
  n = Math.abs(n); // Work with absolute value
  const digits = String(n).split(''); // Convert number to array of digits

  let head = null;
  let tail = null;

  // Handle negative sign
  if (isNegative) {
    head = new Node('-');
    tail = head;
  }

  // Create linked list for digits
  for (const digit of digits) {
    const newNode = new Node(Number(digit));
    if (!head) {
      head = newNode;
      tail = newNode;
    } else {
      tail.next = newNode;
      newNode.prev = tail;
      tail = newNode;
    }
  }

  return head;
}

// Function to convert a doubly linked list to an integer
function linkedListToInteger(head) {
  let isNegative = false;
  let numStr = '';

  // Traverse the linked list
  let current = head;
  while (current) {
    if (current.val === '-') {
      isNegative = true; // Handle negative sign
    } else {
      numStr += current.val; // Append digit to the string
    }
    current = current.next;
  }

  // Convert string to integer and apply sign
  return isNegative ? -Number(numStr) : Number(numStr);
}

// Helper function to print the linked list (for testing)
function printLinkedList(head) {
  let current = head;
  let result = [];
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  console.log(result.join(' <-> '));
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Take input at runtime
rl.question('Enter an integer: ', input => {
  const n = Number(input);

  if (!isNaN(n)) {
    const head = integerToLinkedList(n);
    printLinkedList(head); // Output: Linked list representation
    console.log(linkedListToInteger(head)); // Output: Integer extracted from linked list
  } else {
    console.log('Invalid input. Please enter a valid integer.');
  }

  rl.close();
});
