/* DECLARANDO AS VARIAVEIS */
var taskInput = document.getElementById("new-task"); 
var addButton = document.getElementsByTagName("button")[0]; 
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
var completedTasksHolder = document.getElementById("completed-tasks"); 

// CRIAR LISTA
var createNewTaskElement = function(taskString) {

	var listItem = document.createElement("li");
	//input (checkbox)
	var checkBox = document.createElement("input"); 
	//label
	var label = document.createElement("label");
	//input (text)
	var editInput = document.createElement("input");
	//button.edit
	var editButton = document.createElement("button");
	//button.delete
	var deleteButton = document.createElement("button");

	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Editar";
	editButton.className = "edit";
	deleteButton.innerText = "Apagar";
	deleteButton.className = "delete";

	label.innerText = taskString;

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

// ADD TAREFAS
var addTask = function() {
	//console.log("Adicionando teste");

	if(taskInput.value == '')
	{
		alert('Preencha o campo (ADICIONAR TAREFAS)');
	}
	else
	{
	var listItem = createNewTaskElement(taskInput.value);
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	}
}

// Editar tarefa adicionada
var editTask = function() {
	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text");
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains("editMode");

	
	if (containsClass) {
		if(editInput.value == ''){
			alert('O campo de editar não pode ser vazio');
		}else{
			label.innerText = editInput.value;
		}
	} else {
		editInput.value = label.innerText;
	}

	listItem.classList.toggle("editMode");

}

//Apagando Tarefas
var deleteTask = function() {

	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	ul.removeChild(listItem);
}

//Tarefas completadas
var taskCompleted = function() {
	
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

//Tarefas incompletas
var taskIncomplete = function() {
	
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {

	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	editButton.onclick = editTask;

	deleteButton.onclick = deleteTask;

	checkBox.onchange = checkBoxEventHandler;
}


//Evento de click para adicionar tarefas
addButton.addEventListener("click", addTask);

//Loop de items incompletos
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Loop de items completos
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}