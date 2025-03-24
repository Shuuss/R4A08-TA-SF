
tasks = null

axios.get("http://localhost:3001/tasks").then((response) => {
    console.log(response)
    tasks = response.data
    tasks.sort((a,b) => a.idtask - b.idtask)
    LoadData()
})



function LoadData() {
    tasks.forEach(task => {
        CreateTask(task)
    });
}


function CreateTask(task) {
    const taskList = document.querySelector('#task-list');

    const listItem = document.createElement('li');
    listItem.id = "task-"+task.idtask
    taskList.appendChild(listItem);

    
    checkBox = CreateCheckBox(task.idtask)
    listItem.appendChild(checkBox);
    const delButton = document.createElement('button');
    delButton.classList = "delButton";

    

    const description = document.createElement('span');
    description.innerHTML = task.description;

    listItem.appendChild(description);
    if (task.completed) {
        checkBox.querySelector("input[type=checkbox]").checked = true
        listItem.style.color = "green";

    }

    delButton.textContent = "Supprimer";
    delButton.addEventListener("click", e => {
        DeleteTask(task.idtask)
    })
    listItem.addEventListener("mouseover", e => {
        delButton.style.display = "block"
    })
    listItem.addEventListener("mouseout", e => {
        delButton.style.display = "none"
    })
    listItem.appendChild(delButton);
}


function AddTask() {
    description = document.querySelector("#task-input").value
    axios.post("http://localhost:3001/tasks", { description }).then((response) => {
        CreateTask(response.data)
    })
}

function ValidTask(idtask) {
    axios.put("http://localhost:3001/tasks/" + idtask).then((response) => {
        if (response.data.completed){

            document.querySelector("#task-"+idtask).style.color = "green";

        }
        else {
            document.querySelector("#task-"+idtask).style.color = "";


        }
    })
}

function DeleteTask(idtask) {
    axios.delete("http://localhost:3001/tasks/" + idtask).then((response) => {
        tasks = tasks.filter(x => x.idtask != idtask)
        document.querySelector("#task-list").removeChild(document.querySelector("#task-"+idtask))

    })
}


function CreateCheckBox(idtask) {
    box = document.createElement('div')
    box.innerHTML = `<div class="checkbox-wrapper-30">
            <span class="checkbox">
                <input type="checkbox" />
                <svg>
                    <use xlink:href="#checkbox-30" class="checkbox"></use>
                </svg>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
                <symbol id="checkbox-30" viewBox="0 0 22 22">
                    <path fill="none" stroke="currentColor"
                        d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2" />
                </symbol>
            </svg>
        </div>`
    box.querySelector("input[type=checkbox]").addEventListener("click", () => {
        ValidTask(idtask)
    })
    return box
}

document.querySelector("#task-input").addEventListener("keydown", e => {
    if (e.key === "Enter"){
        document.querySelector("#addButton").click()
        document.querySelector("#task-input").value = ""
    }
})