const textFeld = document.querySelector("#text-Feld");
const addTodos = document.querySelector("#add-Todos");
const deleteTodos = document.querySelector("#delete-Todos");
const ulList = document.querySelector("#ul-List");

let todos = [];

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

    });

}

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



