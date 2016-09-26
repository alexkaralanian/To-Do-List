// VARIABLES bind to specific elements on the page. We will use these in our porgram to manipulate the DOM.

var taskInput = document.getElementById('new-task'); // Text input from ADD ITEM element...
var addButton = document.getElementsByTagName('button')[0]; // Accesses the Add button. Methdo returns an array, references to first add <button> [0]
var incompleteTasks = document.getElementById('to-do-list'); // Accesses to Do List. Returns the <ul> element w all <li> child elements
var completedTasks = document.getElementById('completed-tasks'); // Returns <ul> and descendant list of all completed tasks


// BIND EVENTS TO BUTTONS & CHECKBOX

var bindTaskEvent = function (taskListItem, checkBoxEventHandler) {

    console.log("Binding Events to Checkbox, Edit, Delete Buttons")

    // Select task's <li> children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    // Bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;;

    // Bind editTask to Edit button
    editButton.onclick = editTask;

    // Bind deleteTask to Delete Button
    deleteButton.onclick = deleteTask;
};


// ADD TASK

var addTask = function () {

    console.log('Running addTask Function');

    // Create a new <li> with text from ADD ITEM input.value using the newTaskItem function

    console.log('Declaring new variable, passing text input as argument the the newTaskItem function.')
    var listItem = newTaskItem(taskInput.value);
    console.log('Returning new <li> w input text to addTask')
    console.log(listItem)

    // Append listItem task to TO DO list...
    incompleteTasks.appendChild(listItem);
    console.log('appending item to TO DO list')
    bindTaskEvent(listItem, taskCompleted);
    // taskCompleted gets passed as second argument to the checkBoxEventHandler function in bindTaskEvent

    taskInput.value = "";
    console.log('Resetting text input to empty')//
};

var ajaxRequest = function() {

    console.log("AJAX REQUEST");
}

// Set click handler to addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// CREATE A NEW TASK ITEM

var newTaskItem = function (taskString) {

    console.log("Running newTaskItem, creating new <li> element");


    // Here use .createElement to replicate the <li></li> HTML element and all its inner HTML siblings.

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");

    // using dot notation, we are creating new attributes.
    checkBox.type = "checkbox";
    editInput.type = "text";

    // using dot notation, we are creating new classnames and text attributes.

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    // We are accessing the new elements inner text via the taskString parameter, and passing it arguments (innerText from the Add Item text input, using taskInput.value)

    label.innerText = taskString;

    // here we append to the <li> element each  new element
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

// here we return the complete string
    return listItem;
};


// EDIT TASK

var editTask = function () {

    console.log("Running editTask");

     var listItem = this.parentNode;
     var editInput = listItem.querySelector("input[type=text]")
     var label = listItem.querySelector("label")

     var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        // switch from editMode
        // make label text become input value
        label.innerText = editInput.value;
    }

    else {
        // switch to .editMode
        // input value becomes the labels text
        editInput.value = label.innerText;
    }

    // Toggle .editMode on listItem
    listItem.classList.toggle("editMode");
};

// DELETE TASK

var deleteTask = function () {

    console.log("Running deleteTask");

    var listItem = this.parentNode;
    var ul = listItem.parentNode; // grandparents
    ul.removeChild(listItem); // remove this.child
};

// TASK COMPLETED

var taskCompleted = function () {

    console.log("Running taskCompleted");

    var listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvent(listItem, taskIncomplete);
}

// TASK INCOMPLETE

var taskIncomplete = function () {

    console.log("Running taskIncomplete");

    var listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvent(listItem, taskCompleted);
}

//// WIRING OF THINGS...

// cycle over To Do List items
for (var i = 0; i < incompleteTasks.children.length; i++) {
    // bind events to <li>'s children
    bindTaskEvent(incompleteTasks.children[i], taskCompleted);
};

// cycle over Completed Items
for (var i = 0; i < completedTasks.children.length; i++) {
    // for each list item
    // bind event to <li> children (taskCompleted)
    bindTaskEvent(completedTasks.children[i], taskIncomplete);
};