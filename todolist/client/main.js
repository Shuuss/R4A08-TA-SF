
tasks = null

axios.get("http://localhost:3001/tasks").then((response) => {
    console.log(response)
    tasks = response.data
    SyncTask()
})

function SyncTask(){
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => { //pour chaque tache on ajoute sa description et si elle est complétée on l'affiche en vert et sinon on met un bouton pour la valider
        const listItem = document.createElement('li');
        listItem.textContent = task.description;
        taskList.appendChild(listItem);

        if(task.completed)
        {
            listItem.style.color = "green";
        }
        const checkButton = document.createElement('button');
        checkButton.textContent = "✔";
        checkButton.onclick = () => ValidTask(task.idtask);
        listItem.appendChild(checkButton);

        const delButton = document.createElement('button');
        delButton.textContent = "-";
        delButton.onclick = () => DeleteTask(task.idtask);
        listItem.appendChild(delButton);
        
    });
}

function AddTask(){
    description = document.querySelector("#task-input").value
    axios.post("http://localhost:3001/tasks", {description}).then((response) => {
        tasks.push(response.data)
        SyncTask()
    })
}

function ValidTask(idtask) {
    axios.put("http://localhost:3001/tasks/"+idtask).then((response) => {
        console.log(response)
        tasks.find(x => x.idtask == idtask).completed = response.data.completed
        SyncTask()
    })
}

function DeleteTask(idtask) {
    axios.delete("http://localhost:3001/tasks/"+idtask).then((response) => {
        console.log(response)
        tasks = tasks.filter(x => x.idtask!= idtask)
        SyncTask()
    })
}