let Books = [
{
	title: "JavaScript and jQuery",
	author: "Jon Duckett",
	noOfPages: 640,
	read: "yes"
}
];

function initialLoad(){
	Books.forEach((book)=> addBookToList(book));
}

function Book(title, author, noOfPages, read) {
	this.title = title;
	this.author = author;
	this.noOfPages = noOfPages;
	this.read = read;
}


function addBookToList(book) {
	const list = document.getElementById('list');
	const row = document.createElement('tr');
	row.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.noOfPages}</td>
	<td class="readEvent">${book.read}</td>
	<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
	`;
	list.appendChild(row);
	clearFields();
}

function clearFields() {
	document.querySelector("#formTitle").value='';
	document.querySelector("#formAuthor").value='';
	document.querySelector("#formNoOfPages").value='';
}

let subbtn = document.getElementById('submit');
subbtn.addEventListener('click', (e)=> {
	e.preventDefault();
	let titleInput = document.getElementById('formTitle').value;
	let authorInput = document.getElementById('formAuthor').value;
	let noOfPagesInput = document.getElementById('formNoOfPages').value;
	let readInput;
	if(document.getElementById('formRead').checked){
		readInput = "yes";
	}
	else{
		readInput = "no";
	}

	if(titleInput === '' || authorInput === '' || noOfPagesInput === ''){
		showAlert("Please fill in all fields", "danger");
	}
	else{
		let booking = new Book(titleInput, authorInput, noOfPagesInput, readInput);
		Books.push(booking);
		addBookToList(booking);
	}
});

function showAlert(message, alertClass) {
	const div = document.createElement("div");
	div.className = "alert alert-" + alertClass;
	div.appendChild(document.createTextNode(message));
	const container = document.querySelector('.container');
	const form = document.querySelector('#form');
	container.insertBefore(div, form);
	//Vanish in 3 secs
	setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

document.addEventListener('DOMContentLoaded', initialLoad);

let bookList = document.getElementById("list");
bookList.addEventListener('click', (e) => {
	deleteBook(e.target);
});
function deleteBook(el) {
	if(el.classList.contains('delete')){
		el.parentElement.parentElement.remove();
		Books.forEach((book, index) => {
			if((el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent) == book.title){
				Books.splice(index, 1);
			}
		});
	}
	else if(el.classList.contains('readEvent')){
		if(el.textContent === "yes"){
			el.textContent = "no";
			Books.forEach(book => {
				if((el.previousElementSibling.previousElementSibling.previousElementSibling.textContent) == book.title) {
					book.read = "no";
				}
			});
		}
		else{
			el.textContent = "yes";
			Books.forEach(book => {
				if((el.previousElementSibling.previousElementSibling.previousElementSibling.textContent) == book.title) {
					book.read = "yes";
				}
			});
		}
		console.log(Books);
	}
}
