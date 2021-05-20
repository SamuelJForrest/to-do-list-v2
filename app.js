// Define input and note sections
const noteForm = document.querySelector('.note-form');
const noteInput = document.querySelector('.note-input');
const noteContainer = document.querySelector('.note-container');
const filterToDo = document.querySelector('#filter-todo');

// Create Eventlistener for form
noteForm.addEventListener('submit', (e) => {
    // Set conditional so that users cannot input blank text
    if (noteInput.value == ''){
        e.preventDefault();
        noteInput.value = '';
    } else {
        // Prevent form from submitting
        e.preventDefault();

        // Create note
        const note = document.createElement('div');
        note.classList.add('note');

        //save in local storage
        saveLocalTodos(noteInput.value);

        // Create note text and set its value to the input's value
        const noteText = document.createElement('p');
        noteText.classList.add('note-text');
        noteText.textContent = noteInput.value;

        // Add the symbols div, assign classes, as well as the images
        const symbols = document.createElement('div');
        symbols.classList.add('symbols');
        
        //Create element for the tick image
        const tick = document.createElement('img');
        tick.classList.add('tick');
        tick.src = './img/check.svg';
        symbols.append(tick);

        //Add event listener to make text strikeout when tick is clicked
        tick.addEventListener('click', () => {
            noteText.classList.add('text-strike');
            note.classList.add('white-out');
        });

        //Create element for the delete button
        const cross = document.createElement('img');
        cross.classList.add('cross');
        cross.src = './img/delete.svg';
        symbols.append(cross);

        //Add event listeners to delete the notes when you click the cross
        cross.addEventListener('click', () => {
            note.classList.add('remove');
            removeLocalTodos(note);
            note.addEventListener('transitionend', () => {
                note.remove();
            })
        })

        //Reset input value
        noteInput.value = '';

        //Append elements to the note container
        noteContainer.append(note);
        note.append(noteText);
        note.append(symbols);
    }
});

filterToDo.addEventListener('click', (e) =>{
    const todos = noteContainer.childNodes;
    todos.forEach((todo) => {
        if (todo.classList !== undefined) {
            switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("white-out")) {
                  todo.style.display = "flex";
                } else {
                  todo.style.display = "none";
                }
                break;
              default:
                break;
            case "uncompleted":
                if (!todo.classList.contains('white-out')){
                    todo.style.display = "flex";
                } else {
                  todo.style.display = "none";
                }
                break;
          }
          return;
        };
    })
});

function saveLocalTodos(todo){
    //check for notes in local storage
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //check for notes in local storage
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
         // Create note
         const note = document.createElement('div');
         note.classList.add('note');
 
         // Create note text and set its value to the input's value
         const noteText = document.createElement('p');
         noteText.classList.add('note-text');
         noteText.textContent = todo;
 
         // Add the symbols div, assign classes, as well as the images
         const symbols = document.createElement('div');
         symbols.classList.add('symbols');
         
         //Create element for the tick image
         const tick = document.createElement('img');
         tick.classList.add('tick');
         tick.src = './img/check.svg';
         symbols.append(tick);
 
         //Add event listener to make text strikeout when tick is clicked
         tick.addEventListener('click', () => {
             noteText.classList.add('text-strike');
             note.classList.add('white-out');
         });
 
         //Create element for the delete button
         const cross = document.createElement('img');
         cross.classList.add('cross');
         cross.src = './img/delete.svg';
         symbols.append(cross);
 
         //Add event listeners to delete the notes when you click the cross
         cross.addEventListener('click', () => {
             note.classList.add('remove');
             removeLocalTodos(note);
             note.addEventListener('transitionend', () => {
                 note.remove();
             })
    })
    //Reset input value
    noteInput.value = '';

    //Append elements to the note container
    noteContainer.append(note);
    note.append(noteText);
    note.append(symbols);
})
}

document.addEventListener('DOMContentLoaded', getTodos);

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}