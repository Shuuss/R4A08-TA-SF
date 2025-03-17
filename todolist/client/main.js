        async function fetchTasks() {
            const response = await fetch('http://localhost:3001/tasks'); //j'ai mit 3001 dans le docker compose vu que le port 3000 était occupé
            const tasks = await response.json();
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => { //pour chaque tache on ajoute sa description et si elle est complétée on l'affiche en vert et sinon on met un bouton pour la valider
                const listItem = document.createElement('li');
                listItem.textContent = task.description;
                taskList.appendChild(listItem);

                if(task.completed)
                {
                    listItem.style.color = "green";
                }
                else
                {
                    const checkButton = document.createElement('button');
                    checkButton.textContent = "✔";
                    checkButton.onclick = () => validateTask(task.idtask);
                    listItem.appendChild(checkButton);
                }
            });
        }

        async function addTask() { //si le champ n'est pas vide on ajoute la task en utilisant la route post coté serveur
            const input = document.getElementById('task-input');
            const taskDescription = input.value;
            if (taskDescription) {
                await fetch('http://localhost:3001/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ description: taskDescription })
                });
                input.value = '';
                fetchTasks();
            }
        }

        async function validateTask(taskId) { //on utilise simplement la methode put pour valider les tâches avec l'id associé au bouton en question
            try {
                const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    fetchTasks();
                } else {
                    console.error('Error updating task');
                }
            } catch (error) {
                console.error('Error validating task:', error);
            }
        }

        fetchTasks();