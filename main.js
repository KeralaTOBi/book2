var add = document.querySelector(".add");
var type = document.querySelector(".type");
var overlay = document.querySelector(".overlay");
var cancel = document.getElementById("cancel");

add.addEventListener("click", function () {
  type.style.display = "block";
  overlay.style.display = "block";
});

cancel.addEventListener("click", function () {
  type.style.display = "none";
  overlay.style.display = "none";
});

var task = document.querySelector(".task");
var enter = document.getElementById("enter");
var title = document.getElementById("title");
var author = document.getElementById("author");
var discription = document.getElementById("discription");

// This function creates the book element on the page
function createBookElement(bookData) {
  var ff = document.createElement("div");
  ff.setAttribute('class', "output");
  // 1. We store the unique ID on the element itself
  ff.setAttribute('data-id', bookData.id); 
  ff.innerHTML = `<h2>${bookData.title}</h2><h5>${bookData.author}</h5><p>${bookData.description}</p><button class="delete" onclick="delete1(event)">delete</button>`;
  task.append(ff);
}

// This function runs when you click "enter"
enter.addEventListener("click", function () {
  if (title.value.trim() || author.value.trim() || discription.value.trim()) {
    const taskData = {
      // 2. We create a unique ID using the current timestamp
      id: Date.now(), 
      title: title.value,
      author: author.value,
      description: discription.value,
    };

    createBookElement(taskData);
    
    // Clear the input fields
    title.value = "";
    author.value = "";
    discription.value = "";
    type.style.display = "none";
    overlay.style.display = "none";

    // Use the unique ID as the key for storage
    localStorage.setItem(taskData.id, JSON.stringify(taskData));
  }
});

// This function runs when you click "delete"
function delete1(event) {
  const bookElement = event.target.parentElement;

  // 3. We get the unique ID from the element to delete the correct item
  const idKey = bookElement.getAttribute('data-id');

  localStorage.removeItem(idKey);
  bookElement.remove();
}

// This function runs when the page first loads
window.onload = function () {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const bookDataString = localStorage.getItem(key);
    
    if (bookDataString) {
      const bookDataObject = JSON.parse(bookDataString);
      createBookElement(bookDataObject);
    }
  }
};
