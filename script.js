const textFeld = document.querySelector("#text-Feld");
const addTodos = document.querySelector("#add-Todos");
const deleteTodos = document.querySelector("#delete-Todos");
const ulList = document.querySelector("#ul-List");
const filterInputs = document.querySelectorAll("input[name=radio]");
let todos = [];
let todosDone = [];
function loadFetch() {
    fetch("http://localhost:3000/todos")
        .then((resp) => resp.json())
        .then((todosFromApi) => {
            todos = todosFromApi;
            console.log(todos);
            render();
        })
}

function render() {
    ulList.innerHTML = "";
    todos.forEach(todos => {
        const newLi = document.createElement("li");
        const newCheck = document.createElement("input");
        newCheck.type = "checkbox";
        newCheck.checked = todos.done;
        newCheck.addEventListener("change", () => {
            todos.done = !todos.done;
            filtern();
            fetch("http://localhost:3000/todos/" + todos.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todos),
            }).then((resp) => resp.json());

        })
        const text = document.createTextNode(todos.description);

        newLi.append(newCheck, text);
        ulList.append(newLi);

    })

}

filterInputs.forEach(input => {
    input.addEventListener("change", (event) => {
        filtern(event.target.value);


    })

})






loadFetch();

addTodos.addEventListener("click", () => {
    const todosText = textFeld.value;
    const newTodo = {
        description: todosText,
        done: false,
    };

    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(newTodo),
    })
        .then((resp) => resp.json())
        .then((todosFromApi) => {
            todos.push(todosFromApi);
            render();
        });

});




deleteTodos.addEventListener("click", () => {
    const todosDone = todos.filter((todo) => {
        return todo.done === true;
    });


    for (let todoId of todosDone) {
        fetch("http://localhost:3000/todos/" + todoId.id, {
            method: "DELETE",

        });

        console.log(todoId.id);

    }


})

function filtern(filter = "all") {
    let filternTodos = todos;

    if (filter === "done") {
        filternTodos = todos.filter(todos => todos.done);
    } else if (filter === "open") {
        filternTodos = todos.filter(todos => !todos.done);

    }

    ulList.innerHTML = "";
    for (let todos of filternTodos) {
        const newLi = document.createElement("li");
        const newCheck = document.createElement("input");
        newCheck.type = "checkbox";
        newCheck.checked = todos.done;
        const text = document.createTextNode(todos.description);

        newLi.append(newCheck, text);
        ulList.append(newLi);

    }




}
filtern();














