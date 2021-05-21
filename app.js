document.getElementById("submitTodo").addEventListener("click", addTodo);
let items = [];


function addTodo(){
   let textArea = document.getElementById("addTodoInput").value.trim();
   
   const list = document.getElementById("listOfTodos");

   if(textArea === "")
   {
      
   }
   else
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
        newTodoText.innerText = textArea;
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

        document.getElementById("addTodoInput").value = "";
        

        newTodoText.addEventListener('click', event => {
            toggleChecked(newTodoText);
        })
        
        newDeleteButton.addEventListener('click', event => {
            deleteItem(newTodoItem);
        })

        newEditButton.addEventListener('click', event => {
            editItem(newTodoItem);
        })

        items.push(newTodoItem);

        newEditButton.addEventListener("mouseenter", function( event ) {
            // highlight the mouseenter target
            event.target.style.backgroundColor = "#B7B7A4";
          
          });
          newEditButton.addEventListener("mouseleave", function( event ) {
            // highlight the mouseenter target
            event.target.style.backgroundColor = "white";
          
          });

   }




   function toggleChecked(item)
   {
        let prevSibling = item.previousElementSibling;
        if(prevSibling.style.opacity == 1)
        {
            prevSibling.style.opacity = 0;      
        }
        else
        {
            prevSibling.style.opacity = 1;
        }
   }


   function deleteItem(item)
   {
        item.parentNode.removeChild(item);
        document.getElementById("addTodoInput").style.display = "flex";
        document.getElementById("editTodoInput").style.display = "none";
        document.getElementById("submitTodo").style.display = "flex";
        document.getElementById("editTodo").style.display = "none";
        document.getElementById("addTodoInput").style.display = "flex";
        item.getElementsByClassName("editTodo")[0].style.backgroundColor = "white";
        console.log("closing edit screen")
   }

   

   function editItem(item)
   {
      
       if(item.getElementsByClassName("editTodo")[0].style.backgroundColor !== "rgb(65, 71, 47)")
       {
        clearAllItemsStates();

        item.getElementsByClassName("editTodo")[0].addEventListener("mouseenter", function( event ) {
            // highlight the mouseenter target
            event.target.style.backgroundColor = "rgb(65, 71, 47)";
          
          });
        item.getElementsByClassName("editTodo")[0].addEventListener("mouseleave", function( event ) {
        // highlight the mouseenter target
        event.target.style.backgroundColor = "rgb(65, 71, 47)";

        });

        document.getElementById("addTodoInput").style.display = "none";
        document.getElementById("editTodoInput").style.display = "flex";
        document.getElementById("editTodoInput").value = "";
        document.getElementById("submitTodo").style.display = "none";
        document.getElementById("editTodo").style.display = "flex";
        document.getElementById("addTodoInput").style.display = "none";
        item.getElementsByClassName("editTodo")[0].style.backgroundColor = "rgb(65, 71, 47)";
        console.log("opening edit screen")

       }
       else
       {
        document.getElementById("addTodoInput").style.display = "flex";
        document.getElementById("addTodoInput").value = "";

        document.getElementById("editTodoInput").style.display = "none";
        document.getElementById("submitTodo").style.display = "flex";
        document.getElementById("editTodo").style.display = "none";
        document.getElementById("addTodoInput").style.display = "flex";
        item.getElementsByClassName("editTodo")[0].style.backgroundColor = "#B7B7A4";
        console.log("closing edit screen")

        
        item.getElementsByClassName("editTodo")[0].addEventListener("mouseenter", function( event ) {
            // highlight the mouseenter target
            event.target.style.backgroundColor = "#B7B7A4";
          
          });
        item.getElementsByClassName("editTodo")[0].addEventListener("mouseleave", function( event ) {
        // highlight the mouseenter target
        event.target.style.backgroundColor = "white";

        });


        
       }

   }


   function clearAllItemsStates()
   {
       items.forEach(currentItem => {

        document.getElementById("addTodoInput").style.display = "flex";
        document.getElementById("editTodoInput").style.display = "none";
        document.getElementById("submitTodo").style.display = "flex";
        document.getElementById("editTodo").style.display = "none";
        document.getElementById("addTodoInput").style.display = "flex";
        currentItem.getElementsByClassName("editTodo")[0].style.backgroundColor = "white";
        console.log("clearing all other items")
           
       });
   }

}