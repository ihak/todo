let todos = [];

const LOCAL_STORAGE_AVAILABLE = storageAvailable('localStorage');
const TODOS = 'todos';

window.onload = init;

function init() {
	// check if local storage is available
	if (LOCAL_STORAGE_AVAILABLE) {
		// if todos available add them to the table.
		if (localStorage.getItem(TODOS)) {
			todos = todos.concat(JSON.parse(localStorage.getItem(TODOS)));
			refreshTable();
		}
	}
}

// Add todo handler
function addButtonClicked() {
	let title = document.getElementById('title');
	let note = document.getElementById('note');

	if (title.value === "" || note.value === "") {
		alert('Please provide title and note.');
		return;
	}

	console.log(`Add a new todo with title: "${ title }" and note: "${ note }"`);
	let todo = {title: title.value, note: note.value};
	todos.push(todo);
	let id = todos.length;
	addTodoCell(todo, id);
	
	title.value = "";
	note.value = "";

	if (LOCAL_STORAGE_AVAILABLE) {
		let todostr = JSON.stringify(todos);
		localStorage.setItem(TODOS, todostr);
	}
}

// Delete todo handler
function deleteButtonHandler(button) {
	// Remove todo cell
	let id = button.parentElement.id - 1;
	button.parentElement.parentElement.remove();

	// Remove todo from the array
	todos.splice(id, 1);

	// Sync local storage
	if (LOCAL_STORAGE_AVAILABLE) {
		let todostr = JSON.stringify(todos);
		localStorage.setItem(TODOS, todostr);
	}

	// Refresh the table grid
	refreshTable();
}

// Adds a cell to the table
function addTodoCell(todo, index) {
	let id = index;

	let tableBody = document.getElementById('tbody');

	let tableBodyRow = document.createElement('tr');
	tableBody.appendChild(tableBodyRow);

	let sno = tableBodyRow.insertCell();
	sno.innerHTML = id;
	sno.style.border = '1px solid black';

	let title = tableBodyRow.insertCell();
	title.innerHTML = todo.title;
	title.style.border = '1px solid black';

	let note = tableBodyRow.insertCell();
	note.innerHTML = todo.note;
	note.style.border = '1px solid black';	

	let del = tableBodyRow.insertCell();
	del.id = id;
	del.innerHTML = '<button onclick="deleteButtonHandler(this)">Delete</button>';
	del.style.border = '1px solid black';
}

// Refresh table delteting all rows and adding them again
function refreshTable() {
	// Empty the table body to refresh
	let tbody = document.getElementById('tbody');
	tbody.innerHTML = '';

	// Loop through todos and add cells.
	for (var i = 0; i < todos.length; i++) {
		let todo = todos[i];
		addTodoCell(todo, i+1);
	}
}

// Check if web storage of a certain type is available
function storageAvailable(type) {
	try {
		var storage = window[type],
		x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return e instanceof DOMException && (
    	// everything except Firefox
    	e.code === 22 ||
    	// Firefox
    	e.code === 1014 ||
    	// test name field too, because code might not be present
    	// everything except Firefox
    	e.name === 'QuotaExceededError' ||
    	// Firefox
    	e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
    	// acknowledge QuotaExceededError only if there's something already stored
    	storage.length !== 0;
    }
}

// [Obsolete]
// Creates a table
function createTable() {
	let body = document.body;
	let table = document.createElement('table');
	// table.style.width = '200px';
	table.style.border = '1px solid black';

	let tableHeader = document.createElement('thead');
	table.appendChild(tableHeader);

	let tableHeaderRow = document.createElement('tr');
	tableHeader.appendChild(tableHeaderRow);
	let serialNo = document.createElement('th');
	tableHeader.appendChild(serialNo);
	serialNo.innerHTML = 'Serial No.';
	serialNo.style.border = '1px solid black';

	let titleHeader = document.createElement('th');
	tableHeader.appendChild(titleHeader);
	titleHeader.innerHTML = 'Title';
	titleHeader.style.border = '1px solid black';
	
	let noteHeader = document.createElement('th');
	tableHeader.appendChild(noteHeader);
	noteHeader.innerHTML = 'Note';
	noteHeader.style.border = '1px solid black';

	let tableBody = document.createElement('tbody');
	tableBody.id = "tbody";
	table.appendChild(tableBody);

	body.appendChild(table);
}