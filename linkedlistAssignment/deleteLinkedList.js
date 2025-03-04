const readline = require('readline');

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Function to create a linked list from an array
function createLinkedList(arr) {
  if (arr.length === 0) {
    return null;
  }

  let head = new Node(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new Node(arr[i]);
    current = current.next;
  }

  return head;
}

// Function to remove nodes from the linked list that have values in the array
function removeNodesFromArray(head, array) {
  // Convert the array to a Set for O(1) lookups
  const set = new Set(array);

  // Create a dummy node to handle edge cases (e.g., removing the head)
  let dummy = new Node(0);
  dummy.next = head;
  let current = dummy;

  // Traverse the linked list
  while (current.next) {
    if (set.has(current.next.val)) {
      // Skip the node if its value is in the array
      current.next = current.next.next;
    } else {
      // Move to the next node
      current = current.next;
    }
  }

  return dummy.next; // Return the modified linked list
}

// Function to print the linked list
function printLinkedList(head) {
  let current = head;
  let result = [];
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  console.log(result.join(' -> '));
}

// Setup readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get the linked list elements and nodes to remove
rl.question(
  'Enter the elements of the linked list (comma separated): ',
  linkedListInput => {
    const linkedListElements = linkedListInput.split(',').map(Number);

    rl.question(
      'Enter the values to remove from the linked list (comma separated): ',
      removeInput => {
        const valuesToRemove = removeInput.split(',').map(Number);

        const head = createLinkedList(linkedListElements);
        const modifiedHead = removeNodesFromArray(head, valuesToRemove);

        console.log('Modified linked list:');
        printLinkedList(modifiedHead);

        rl.close();
      }
    );
  }
);
