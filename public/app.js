function sizeCheck()
{
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
            currentTodo.style.minHeight = 400 + 'px';
            currentTodo.style.height = (currentTodo.childNodes[1].childNodes[0].scrollHeight + 300) + 'px';
            currentTodo.style.maxHeight = (currentTodo.childNodes[1].childNodes[0].scrollHeight + 300) + 'px';
        }
        else
        {
            currentTodo.classList.remove("smallScreen")
            currentTodo.childNodes[0].style.height = "auto";
            currentTodo.childNodes[0].style.minHeight = "";
            currentTodo.childNodes[0].style.maxHeight = ""
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
        text: "This is an example todo, created because your local storage has no todos in it. Edit and delete with the buttons on the right, or click my text to tick me.",
        checked: false
    }

    localStorage.setItem("0", JSON.stringify(newTodo))
}

let currentID = getLastID();

function getLastID(){
    let keys = Object.keys(localStorage).sort()
    if(keys[keys.length - 1] == null)
    {
        return 0
    }
    let newKey = parseInt(keys[keys.length - 1]) + 1

    return newKey;
}

populateTodosFromStorage();

document.addEventListener("keydown", enterKeyCheck)
function enterKeyCheck()
{
    if (event.code === 'Enter' && document.getElementById("submitTodo").style.display !== "none")
    {
        submitTodo()
    }
}
document.getElementById("submitTodo").addEventListener("click",  submitTodo)

function submitTodo()
{
    if(getTextFromAddBox() !== "")
    {
        let newTodo = {
            id: currentID,
            text: getTextFromAddBox(),
            checked: false
        }
            createTodo(newTodo, false);
    }
}

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
    sizeCheck()
}

function createTodo(newTodo, fromStorage)
{
    let newTodoAsMarkup = createTodoMarkup(newTodo);


    if(!fromStorage)
    {
        newTodoAsMarkup.childNodes[0].style.height = "";
        newTodoAsMarkup.style.transition = "height ease 0.75s, min-height ease 0.75s, max-height ease 0.75s";
        newTodoAsMarkup.childNodes[1].childNodes[0].style.transition = "all none";
        newTodoAsMarkup.childNodes[1].childNodes[0].style.fontSize = "2rem";
        newTodoAsMarkup.childNodes[0].style.transition = "all ease-in-out 0.2s"

        newTodoAsMarkup.childNodes[2].childNodes[0].childNodes[0].style.transition = "all ease 0.75s";
        newTodoAsMarkup.childNodes[2].childNodes[1].childNodes[0].style.transition = "all ease 0.75s";

        newTodoAsMarkup.childNodes[2].childNodes[0].style.height = 50 + '%';
        newTodoAsMarkup.childNodes[2].childNodes[1].style.height = 50 + '%';

        let heightOfThisTodo = newTodoAsMarkup.childNodes[1].childNodes[0].scrollHeight;
        newTodoAsMarkup.childNodes[1].style.padding = 25 + 'px'


        newTodoAsMarkup.childNodes[2].childNodes[0].childNodes[0].style.height = 'clamp(50px, 5vh, 150px)';
        newTodoAsMarkup.childNodes[2].childNodes[1].childNodes[0].style.height = 'clamp(50px, 5vh, 150px)';


        newTodoAsMarkup.classList.add(newTodo.id)

        function mobileCheck(eventListener)
        {
            if (newTodoAsMarkup.classList.contains("smallScreen"))
            {
                newTodoAsMarkup.childNodes[0].style.transition = "none"
                newTodoAsMarkup.childNodes[0].style.height = "0px"

                newTodoAsMarkup.childNodes[0].style.transition = "none"
                if(newTodoAsMarkup.childNodes[1].style.textDecorationLine === "line-through")
                {
                    newTodoAsMarkup.childNodes[0].style.height = "0px"

                        newTodoAsMarkup.childNodes[0].style.transition = "none"
                        sizeCheck()

                }

                newTodoAsMarkup.childNodes[2].childNodes[0].style.height = 100 + 'px';
                newTodoAsMarkup.childNodes[2].childNodes[1].style.height = 100 + 'px';

                newTodoAsMarkup.style.minHeight = 400 + 'px';
                newTodoAsMarkup.style.height = (heightOfThisTodo + 250) + 'px';
                newTodoAsMarkup.style.maxHeight = (heightOfThisTodo + 250) + 'px';

                newTodoAsMarkup.style.justifyContent = "space-between"

                setTimeout(()=>
                {
                    newTodoAsMarkup.childNodes[0].style.transition = "none"
                },250)
            }
            else
            {
                newTodoAsMarkup.childNodes[2].childNodes[0].style.height = 100 + 'px';
                newTodoAsMarkup.childNodes[2].childNodes[1].style.height = 100 + 'px';
                newTodoAsMarkup.style.minHeight = 200 + 'px';
                newTodoAsMarkup.style.height = (heightOfThisTodo + 100) + 'px';
                newTodoAsMarkup.style.maxHeight = (heightOfThisTodo + 100) + 'px';
                newTodoAsMarkup.style.justifyContent = "space-between"

                newTodoAsMarkup.childNodes[0].style.height = "auto";
            }
        }
        let eventListener = window.matchMedia("(max-width: 600px)")
        mobileCheck(eventListener) // Call listener function at run time
        eventListener.addListener(mobileCheck) // Attach listener function on state changes

        document.getElementById("addTodoInput").value = "";

        setTimeout(()=>{
            newTodoAsMarkup.style.transition = "none";
        },750)
        sizeCheck()
    }
    if(fromStorage)
    {
        newTodoAsMarkup.style.transition = "none"
        newTodoAsMarkup.childNodes[1].childNodes[0].style.transition = "none"
        newTodoAsMarkup.childNodes[1].childNodes[0].style.fontSize = "2rem";

        newTodoAsMarkup.classList.add(newTodo.id)

        setTimeout(()=>
        {
            function mobileCheck(eventListener)
            {
                let heightOfThisTodo = newTodoAsMarkup.childNodes[1].childNodes[0].scrollHeight;
                if(newTodoAsMarkup.classList.contains("smallScreen"))
                {
                    newTodoAsMarkup.childNodes[2].childNodes[0].style.height = 100 + 'px';
                    newTodoAsMarkup.childNodes[2].childNodes[1].style.height = 100 + 'px';
                    newTodoAsMarkup.style.minHeight = 400 + 'px';
                    newTodoAsMarkup.style.height = (heightOfThisTodo + 300) + 'px';
                    newTodoAsMarkup.style.maxHeight = (heightOfThisTodo + 300) + 'px';
                    newTodoAsMarkup.style.justifyContent = "space-between"

                }
                else
                {
                    newTodoAsMarkup.childNodes[2].childNodes[0].style.height = 50 + '%';
                    newTodoAsMarkup.childNodes[2].childNodes[1].style.height = 50 + '%';

                    newTodoAsMarkup.childNodes[2].childNodes[0].childNodes[0].style.height = 'clamp(50px, 5vh, 150px)';
                    newTodoAsMarkup.childNodes[2].childNodes[1].childNodes[0].style.height = 'clamp(50px, 5vh, 150px)';
                    newTodoAsMarkup.style.justifyContent = ""
                    newTodoAsMarkup.style.minHeight = 200 + "px";
                    newTodoAsMarkup.style.height = heightOfThisTodo + 100 + "px";
                    newTodoAsMarkup.style.maxHeight = heightOfThisTodo + 100 + "px";
                    newTodoAsMarkup.childNodes[1].style.padding = 25 + 'px'
                }
            }
            let eventListener = window.matchMedia("(max-width: 600px)")
            mobileCheck(eventListener) // Call listener function at run time
            eventListener.addListener(mobileCheck) // Attach listener function on state changes
        },100)
        sizeCheck()
    }

    createTodoEventListeners(newTodoAsMarkup, newTodo)

    if(!fromStorage)
    {
        addTodoToStorage(JSON.stringify(newTodo));

        document.getElementById("submitTodo").removeEventListener("click",  submitTodo);
        document.removeEventListener("keydown",  enterKeyCheck);

        setTimeout(()=>
        {
            document.getElementById("submitTodo").addEventListener("click",  submitTodo)
            document.addEventListener("keydown",  enterKeyCheck)
        }, 750)
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
    const newTextPTag = document.createElement("p");
    const newButtonContainer = document.createElement("div");
    const newEditButton = document.createElement("button");
    const newDeleteButton = document.createElement("button");

    const newEditButtonImg = document.createElement("img");
    const newDeleteButtonImg = document.createElement("img");

    newChecked.classList.add("checked");
    newTodoItem.classList.add("todoItem")

    document.getElementById("listOfTodos").append(newTodoItem);

    newTodoText.classList.add("todoText")
    newTextPTag.innerText = todoObject.text;

    newTodoItem.append(newChecked);
    newTodoItem.append(newTodoText);
    newTodoText.append(newTextPTag)

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

function createTodoEventListeners(newTodoItem, todoObject, markupID)
{

    let newTodoChecked = newTodoItem.childNodes[0];
    let newTodoText = newTodoItem.childNodes[1];
    let newEditButton = newTodoItem.childNodes[2].childNodes[0];
    let newDeleteButton = newTodoItem.childNodes[2].childNodes[1];



    newTodoText.addEventListener('click', () =>
    {
        toggleChecked(newTodoItem, todoObject, markupID);
    })

    newDeleteButton.addEventListener('click', () =>
    {
        deleteItem(todoObject);
    })

    newEditButton.addEventListener('click', () =>
    {
        editItem(newTodoItem, todoObject);
    })

    function toggleChecked(newTodoItem, todoObject, markupID)
    {
        if(todoObject.checked === true)
        {
                if(newTodoItem.classList.contains("smallScreen"))
                {
                    if(parseInt(newTodoItem.classList[1]) === todoObject.id)
                    {

                        setInterval(() =>
                        {
                            newTodoChecked.style.transition = "all 0.25s"
                        }, 250)
                        newTodoItem.childNodes[0].style.height = "0";
                        newTodoItem.childNodes[0].style.opacity = "0";
                    }
                }
                else
                {
                    newTodoChecked.style.height = "";
                    newTodoChecked.style.minHeight = "";
                    newTodoChecked.style.maxHeight = "";
                }

            newTodoChecked.style.opacity = "0";
            newTodoText.style.textDecorationLine = "none";
            todoObject.checked = false;
            localStorage.setItem(todoObject.id, JSON.stringify(todoObject))
        }
        else
        {
                if(newTodoItem.classList.contains("smallScreen"))
                {
                    if(parseInt(newTodoItem.classList[1]) === todoObject.id)
                    {
                        setInterval(() =>
                        {
                            newTodoChecked.style.transition = "all 0.25s"
                        }, 250)
                        //newTodoItem.childNodes[0].style.height = "50px";
                        newTodoItem.childNodes[0].style.opacity = "1";
                    }
                }
                else
                {
                    newTodoItem.childNodes[0].style.height = "auto";
                    newTodoItem.childNodes[0].style.minHeight = "";
                    newTodoItem.childNodes[0].style.maxHeight = "";
                }

            newTodoChecked.style.opacity = "1";
            newTodoText.style.textDecorationLine = "line-through";
            todoObject.checked = true;
            localStorage.setItem(todoObject.id, JSON.stringify(todoObject))
        }
    sizeCheck()
    }

    function deleteItem(todoObject)
    {
        let keys = Object.keys(localStorage)
        keys.forEach(currentKey =>
        {
            if(JSON.parse(localStorage.getItem(currentKey)).id === todoObject.id)
            {
                newTodoItem.style.transition = "all ease-in-out 1s, border-radius ease 0s"
                newTodoItem.childNodes[2].childNodes[0].childNodes[0].style.transition = "all ease-in-out 1s";
                newTodoItem.childNodes[2].childNodes[1].childNodes[0].style.transition = "all ease-in-out 1s";



                newTodoItem.childNodes[1].style.transition = "all ease-in-out 1s"

                newTodoItem.childNodes[1].childNodes[0].style.transition = "all ease-in-out 1s"
                newTodoItem.childNodes[2].childNodes[0].classList.remove("inEdit")

                setTimeout(()=> {
                    newTodoItem.style.height = 0 + 'px';
                    newTodoItem.style.minHeight = '0' + 'px';
                    newTodoItem.style.maxHeight = 0 + 'px';
                    newTodoItem.childNodes[2].childNodes[0].childNodes[0].style.height = '0px';
                    newTodoItem.childNodes[2].childNodes[1].childNodes[0].style.height = '0px';

                    newTodoItem.childNodes[1].style.paddingTop = 0 + 'px'
                    newTodoItem.childNodes[1].style.paddingBottom = 0 + 'px'

                },10)

                setTimeout(()=>
                {
                    newTodoItem.style.display = "none"
                }, 2000)


                setTimeout(()=>{
                    newTodoItem.style.marginBottom = 0 + 'px';
                },1000)

                    localStorage.removeItem(todoObject.id);

            }
        })
                //populateTodosFromStorage()
        showAddScreen()
    }

    function editItem(newTodoItem, todoObject)
    {
        let currentlyExistingTodos = document.querySelectorAll(".todoItem")


        currentlyExistingTodos.forEach(currentTodo =>
        {
            currentTodo.childNodes[2].childNodes[0].classList.remove("hoverClass");
            currentTodo.childNodes[2].childNodes[0].style.backgroundColor = "white"
        })

        currentlyExistingTodos.forEach(currentTodo =>
        {
            if(newTodoItem === currentTodo)
            {
                if(currentTodo.childNodes[2].childNodes[0].classList.contains("inEdit"))
                {
                    currentTodo.childNodes[2].childNodes[0].classList.remove("inEdit");
                    showAddScreen(newTodoItem)


                }
                else
                {
                    currentTodo.childNodes[2].childNodes[0].classList.add("inEdit");
                    showEditScreen(newTodoItem)

                    document.getElementById("editTodo").addEventListener("click", editEventListener)

                    document.addEventListener("keyup", enterEditCheck)


                    function enterEditCheck(event)
                    {
                        if (event.code === 'Enter' && document.getElementById("submitTodo").style.display === "none")
                        {
                            editEventListener()
                        }
                    }

                    function editEventListener()
                    {
                        currentTodo.childNodes[2].childNodes[0].classList.remove("hoverClass");

                        document.removeEventListener("keyup", enterEditCheck)
                        document.getElementById("editTodo").removeEventListener("click", editEventListener)

                        if(currentTodo.childNodes[2].childNodes[0].classList.contains("inEdit") && document.getElementById("editTodoInput").value.trim() !== "")
                        {

                            currentTodo.childNodes[2].childNodes[0].classList.remove("inEdit")
                            todoObject.text = document.getElementById("editTodoInput").value;

                            newTodoItem.childNodes[1].childNodes[0].innerText = document.getElementById("editTodoInput").value;

                            newTodoItem.style.transition = "all ease 0.75s";
                            newTodoItem.childNodes[1].childNodes[0].style.transition = "all ease 0.75s";

                            newTodoItem.childNodes[2].childNodes[0].childNodes[0].style.transition = "all ease 0.75s";
                            newTodoItem.childNodes[2].childNodes[1].childNodes[0].style.transition = "all ease 0.75s";

                            let heightOfThisTodo = newTodoItem.childNodes[1].childNodes[0].scrollHeight;

                            setTimeout(()=>
                            {
                                if(newTodoItem.classList.contains("smallScreen"))
                                {
                                    newTodoItem.style.minHeight = 400 + 'px';
                                    newTodoItem.style.height = (heightOfThisTodo + 200) + 'px';
                                    newTodoItem.style.maxHeight = (heightOfThisTodo + 200) + 'px';
                                }
                                else
                                {
                                    newTodoItem.style.minHeight = 200 + 'px';
                                    newTodoItem.style.height = (heightOfThisTodo + 100) + 'px';
                                    newTodoItem.style.maxHeight = (heightOfThisTodo + 100) + 'px';
                                }


                            },10)


                            localStorage.setItem(todoObject.id, JSON.stringify(todoObject))

                            showAddScreen(newTodoItem);
                            //populateTodosFromStorage()
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



function showAddScreen(currentTodo)
{
    if(currentTodo)
    {
        currentTodo.childNodes[2].childNodes[0].style.backgroundColor ="white";
        //currentTodo.childNodes[2].childNodes[0].classList.remove("hoverClass")
    }

   document.getElementById("editTodoInput").style.display = "none";
   document.getElementById("addTodoInput").style.display = "block";
   document.getElementById("editTodo").style.display = "none";
   document.getElementById("submitTodo").style.display = "block";
   document.getElementById("addTodoInput").value = "";
   document.getElementById("editTodoInput").value = "";
}

function showEditScreen(currentTodo)
{
    if(currentTodo) {
        currentTodo.childNodes[2].childNodes[0].style.backgroundColor = "#6B705C";
        currentTodo.childNodes[2].childNodes[0].classList.add("hoverClass")
    }
   document.getElementById("addTodoInput").style.display = "none";
   document.getElementById("editTodoInput").style.display = "block";
   document.getElementById("submitTodo").style.display = "none";
   document.getElementById("editTodo").style.display = "block";
   document.getElementById("addTodoInput").value = "";
   document.getElementById("editTodoInput").value = "";
}


