var add = document.querySelector(".add")
var type= document.querySelector(".type")
var overlay = document.querySelector(".overlay")
var cancel =document.getElementById("cancel")

add.addEventListener("click",function(){
  type.style.display="block"
  overlay.style.display="block"

})
cancel.addEventListener("click",function(){
  type.style.display="none"
  overlay.style.display="none"

})
var task = document.querySelector(".task")
var enter= document.getElementById("enter")
var title= document.getElementById("title")
var author= document.getElementById("author")
var discription= document.getElementById("discription")
function createBookElement(bookData) {
  var ff = document.createElement("div");
  ff.setAttribute('class', "output");
  ff.setAttribute('data-id', bookData.id); // <-- ADD: Store the ID here
  ff.innerHTML = `<h2>${bookData.title}</h2><h5>${bookData.author}</h5><p>${bookData.description}</p><button class="delete" onclick="delete1(event)">delete</button>`;
  task.append(ff);
}

enter.addEventListener("click", function () {
  if (title.value.trim() || author.value.trim() || discription.value.trim()) {
    const taskData = {
      id: Date.now(), // <-- ADD: Create a unique ID
      title: title.value,
      author: author.value,
      description: discription.value,
    };

    createBookElement(taskData);
    
    // Clear inputs and hide modal
    title.value = "";
    author.value = "";
    discription.value = "";
    type.style.display = "none";
    overlay.style.display = "none";

    // CHANGE: Use the unique ID as the key for storage
    localStorage.setItem(taskData.id, JSON.stringify(taskData));
  }
});
function delete1(event) {
  const bookElement = event.target.parentElement;

  // CHANGE: Get the unique ID from the data-id attribute
  const idKey = bookElement.getAttribute('data-id');

  // Remove the correct item from localStorage using its ID
  localStorage.removeItem(idKey);

  // Remove the element from the page
  bookElement.remove();
}
window.onload = function () {
  // Loop through all items in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const bookDataString = localStorage.getItem(key);
    
    if (bookDataString) {
      const bookDataObject = JSON.parse(bookDataString);
      createBookElement(bookDataObject);
    }
  }
};