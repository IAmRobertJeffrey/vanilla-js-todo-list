function sizeCheck() {
    let todos = document.querySelectorAll(".todoItem")

    todos.forEach(currentTodo =>
    {
        if (window.matchMedia("(max-width: 600px)").matches)
        {
            currentTodo.classList.add("smallScreen")
            if(currentTodo.childNodes[0].style.opacity === "1")
            {
                currentTodo.childNodes[0].style.height = "50px";
            }
            else
            {
                currentTodo.childNodes[0].style.height = "0px";
            }
        } else
        {
            currentTodo.classList.remove("smallScreen")
            currentTodo.childNodes[0].style.height = "";
        }

    })
}
    let query = window.matchMedia('(max-width: 600px)')
    query.addListener(sizeCheck);
    window.onload = sizeCheck


let keysExistingOnLoad = Object.keys(localStorage).sort();

if(keysExistingOnLoad.length === 0)
{

    let newTodo = {
        id: 0,
        text: "This is an example todo, created because your local storage has no todos in it. Feel free to delete me, edit me, or make a new todo!",
        checked: false
    }

    localStorage.setItem("0", JSON.stringify(newTodo))
}

let currentID = getLastID();

function placeInitialTodos()
{
    console.log("hi there's nothing here")
}


function getLastID(){
    let keys = Object.keys(localStorage).sort()
    if(keys[keys.length - 1] == null)
    {
        return 0
    }
    let newKey = parseInt(keys[keys.length - 1]) + 1

    return newKey;
}

function reProvidekeys()
{
    let id = 0;
    if(Object.keys(localStorage).length > 0)
    {
        let keys = Object.keys(localStorage).sort()
        keys.forEach(key => {
            key.id = id;
            id++;
        })

    }
    else
    {
        return 0;
    }

}

populateTodosFromStorage();

document.getElementById("submitTodo").addEventListener("click", () =>
{
    if(getTextFromAddBox() !== "")
    {
        let newTodo = {
            id: currentID,
            text: getTextFromAddBox(),
            checked: false
        }

        createTodo(newTodo, false);
        populateTodosFromStorage();
    }
});

function populateTodosFromStorage()
{
    clearCurrentTodos();
    let keys = Object.keys(localStorage).sort()
    keys.forEach(currentKey =>
    {
        if(localStorage.getItem(currentKey) !== null)
        {
            createTodo(JSON.parse(localStorage.getItem(currentKey)), true);
        }
    })

    console.clear()
    keys.forEach(key => {
        console.log(JSON.parse(localStorage.getItem(key)));
    })
    sizeCheck()
}

function createTodo(newTodo, fromStorage)
{
    let newTodoAsMarkup = createTodoMarkup(newTodo);

    if(!fromStorage)
    {
        document.getElementById("addTodoInput").value = "";
    }

    createTodoEventListeners(newTodoAsMarkup, newTodo)

    if(!fromStorage)
    {
        addTodoToStorage(JSON.stringify(newTodo));
    }
}

function getTextFromAddBox()
{
    return document.getElementById("addTodoInput").value.trim();
}

function addTodoToStorage(newTodo)
{
    localStorage.setItem(currentID.toString(), newTodo)
    currentID++;
}

function createTodoMarkup(todoObject)
{
    const newTodoItem = document.createElement("div");
    const newChecked = document.createElement("div");
    const newTodoText = document.createElement("li");
    const newButtonContainer = document.createElement("div");
    const newEditButton = document.createElement("button");
    const newDeleteButton = document.createElement("button");

    const newEditButtonImg = document.createElement("img");
    const newDeleteButtonImg = document.createElement("img");







    newChecked.classList.add("checked");
    newTodoItem.classList.add("todoItem")

    document.getElementById("listOfTodos").append(newTodoItem);

    newTodoText.classList.add("todoText")
    newTodoText.innerText = todoObject.text;
    newTodoItem.append(newChecked);
    newTodoItem.append(newTodoText);

    newButtonContainer.classList.add("buttonContainer")
    newTodoItem.append(newButtonContainer);
    newButtonContainer.append(newEditButton);
    newButtonContainer.append(newDeleteButton);

    newEditButton.classList.add("todoButton")
    newEditButton.classList.add("editTodo")
    newDeleteButton.classList.add("todoButton")
    newDeleteButton.classList.add("deleteTodo")

    newEditButtonImg.src = "./css/img/edit-pen.svg";
    newDeleteButtonImg.src = "./css/img/trash-can.svg";

    newEditButtonImg.classList.add("editIcon");
    newDeleteButtonImg.classList.add("deleteIcon");
    newEditButton.append(newEditButtonImg);
    newDeleteButton.append(newDeleteButtonImg);

    if(todoObject.checked === true)
    {
        newChecked.style.opacity = "1";
        newTodoText.style.textDecorationLine = "line-through";
    }
    else
    {
        newChecked.style.opacity = "0";
        newTodoText.style.textDecorationLine = "none";
    }
    return newTodoItem;
}

function createTodoEventListeners(newTodoItem, todoObject)
{
    let newTodoChecked = newTodoItem.childNodes[0];
    let newTodoText = newTodoItem.childNodes[1];
    let newEditButton = newTodoItem.childNodes[2].childNodes[0];
    let newDeleteButton = newTodoItem.childNodes[2].childNodes[1];

    newTodoText.addEventListener('click', () => {
        toggleChecked(newTodoItem, todoObject);
    })

    newDeleteButton.addEventListener('click', () =>
    {
        deleteItem(todoObject);
    })

    newEditButton.addEventListener('click', () =>
    {
        editItem(newTodoItem, todoObject);
    })

    function toggleChecked(newTodoItem, todoObject)
    {
        if(todoObject.checked === true)
        {
            newTodoChecked.style.opacity = "0";
            let fml = document.querySelectorAll(".todoItem");
            if(fml[0].classList.contains("smallScreen"))
            {
                newTodoChecked.style.height = "0px";
            }
            else
            {
                newTodoChecked.style.height = "";
            }
            newTodoText.style.textDecorationLine = "none";
            todoObject.checked = false;
            localStorage.setItem(todoObject.id, JSON.stringify(todoObject))
        }
        else
        {
            newTodoChecked.style.opacity = "1";

            let fml = document.querySelectorAll(".todoItem");
            if(fml[0].classList.contains("smallScreen"))
            {
                newTodoChecked.style.height = "50px";
            }

            newTodoText.style.textDecorationLine = "line-through";
            todoObject.checked = true;
            localStorage.setItem(todoObject.id, JSON.stringify(todoObject))
        }

    }

    function deleteItem(todoObject)
    {
        let keys = Object.keys(localStorage)
        keys.forEach(currentKey =>
        {
            if(JSON.parse(localStorage.getItem(currentKey)).id === todoObject.id)
            {
                localStorage.removeItem(todoObject.id);
            }
        })
        populateTodosFromStorage()
    }

    function editItem(newTodoItem, todoObject)
    {
        let currentlyExistingTodos = document.querySelectorAll(".todoItem")

        currentlyExistingTodos.forEach(currentTodo => {

            if(newTodoItem === currentTodo)
            {
                if(currentTodo.childNodes[2].childNodes[0].classList.contains("inEdit"))
                {
                    currentTodo.childNodes[2].childNodes[0].classList.remove("inEdit");
                    showAddScreen()
                }
                else
                {
                    currentTodo.childNodes[2].childNodes[0].classList.add("inEdit");
                    showEditScreen()

                    document.getElementById("editTodo").addEventListener("click", editEventListener)

                    function editEventListener()
                    {
                        document.getElementById("editTodo").removeEventListener("click", editEventListener)
                        if(currentTodo.childNodes[2].childNodes[0].classList.contains("inEdit") && document.getElementById("editTodoInput").value.trim() !== "")
                        {
                            todoObject.text = document.getElementById("editTodoInput").value;
                            localStorage.setItem(todoObject.id, JSON.stringify(todoObject))

                            showAddScreen();
                            populateTodosFromStorage()
                        }
                    }
                }
            }
            else
            {
                currentTodo.childNodes[2].childNodes[0].classList.remove("inEdit");
            }
        })

    }
}

function clearCurrentTodos()
{
    let items = document.querySelectorAll(".todoItem");

    for(let i = 0; i < items.length; i++)
    {
        items[i].parentNode.removeChild(items[i]);
    }
}



function showAddScreen()
{
   document.getElementById("editTodoInput").style.display = "none";
   document.getElementById("addTodoInput").style.display = "block";
   document.getElementById("editTodo").style.display = "none";
   document.getElementById("submitTodo").style.display = "block";
   document.getElementById("addTodoInput").value = "";
   document.getElementById("editTodoInput").value = "";
}

function showEditScreen()
{
   document.getElementById("addTodoInput").style.display = "none";
   document.getElementById("editTodoInput").style.display = "block";
   document.getElementById("submitTodo").style.display = "none";
   document.getElementById("editTodo").style.display = "block";
   document.getElementById("addTodoInput").value = "";
   document.getElementById("editTodoInput").value = "";
}



