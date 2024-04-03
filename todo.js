document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.querySelector("#todo-form");
    const todoInput = document.querySelector("#todo");
    const todoList = document.querySelector("#todo-list");
    const editForm = document.querySelector("#edit-form");
    const editInput = document.querySelector("#edit");
    const cancelEditBtn = document.querySelector(".cancel");

    const updateTime = () => {
        const currentDate = new Date();
        let h = currentDate.getHours().toString().padStart(2, '0');
        let m = currentDate.getMinutes().toString().padStart(2, '0');
        let s = currentDate.getSeconds().toString().padStart(2, '0');
        let day = currentDate.getDate().toString().padStart(2, '0');
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let year = currentDate.getFullYear();
    
        document.getElementById("hour").innerHTML = `${h}:${m}:${s}`;
        document.getElementById("date").innerHTML = `${day}/${month}/${year}`;
        
        setTimeout(updateTime, 500);
    };
    updateTime();

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputValue = todoInput.value;
        if (inputValue.trim() !== "") saveTodo(inputValue.trim());
    });
    
    const saveTodo = (text) => {
        const todo = document.createElement("div");
        todo.classList.add("todo");
        const todoTitle = document.createElement("h3");
        todoTitle.innerText = text;
        todo.appendChild(todoTitle);

        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        todo.appendChild(doneBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        todo.appendChild(editBtn);

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-todo");
        removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        todo.appendChild(removeBtn);

        todoList.appendChild(todo);
        todoInput.value = "";
        todoInput.focus();
    };

    document.addEventListener("click", (e) => {
        const targetEl = e.target;
        const parentEl = targetEl.closest(".todo");
        let todoTitle;

        if (parentEl && parentEl.querySelector("h3")) {
            todoTitle = parentEl.querySelector("h3").innerText;

            if (targetEl.classList.contains("finish-todo")) {
                parentEl.classList.toggle("done");
            } else if (targetEl.classList.contains("remove-todo")) {
                parentEl.remove();
            } else if (targetEl.classList.contains("edit-todo")) {
                editInput.value = todoTitle;
                oldInputValue = todoTitle; // Assuming you've declared oldInputValue somewhere
                toggleForms();
            }
        }
    });

    const toggleForms = () => {
        editForm.classList.toggle("hide");
        todoForm.classList.toggle("hide");
        todoList.classList.toggle("hide");
    };

    cancelEditBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleForms();
    });

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const editInputValue = editInput.value;
        if (editInputValue.trim() !== "") updateTodo(editInputValue.trim());
        toggleForms();
    });

    const updateTodo = (text) => {
        const todos = document.querySelectorAll(".todo");
        todos.forEach((todo) => {
            let todoTitle = todo.querySelector("h3");
            if (todoTitle.innerText === oldInputValue) todoTitle.innerText = text;
        });
    };
});
