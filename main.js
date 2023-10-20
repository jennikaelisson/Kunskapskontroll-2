let nameInput = document.getElementById('name-input');
let numberInput = document.getElementById('number-input');
let contacts = [];
let isEditing = false;

// Function to create a contact element
function createContactElement(contact) {
    // Create a li element with a contact div
    let contactItem = document.createElement('li');
    let contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');

    // Create a div element to hold the contact's name
    let nameDiv = document.createElement('div');
    let nameInput = document.createElement('input');
    nameInput.value = contact.name;
    nameInput.setAttribute('type', 'text');
    nameInput.disabled = true; // Disable field so changes cannot be made
    nameDiv.appendChild(nameInput);

    // Create a div element to hold the contact's number
    let numberDiv = document.createElement('div');
    let numberInput = document.createElement('input');
    numberInput.value = contact.number;
    numberInput.setAttribute('type', 'text');
    numberInput.disabled = true; // Disable field so changes cannot be made
    numberDiv.appendChild(numberInput);

    // Create edit and delete button associated with each new contact
    let editButton = createEditButton(nameInput, numberInput);
    let deleteButton = createDeleteButton(contact, contactItem);

    // Attach all new elements in the right place
    contactDiv.appendChild(nameDiv);
    contactDiv.appendChild(numberDiv);
    contactDiv.appendChild(editButton);
    contactDiv.appendChild(deleteButton);
    contactItem.appendChild(contactDiv);
    return contactItem;
}

// Connect add contact button with the correct event listener
document.querySelector('.add-contact-btn').addEventListener('click', addContact);

// Create a delete all button that can remove the whole contact list
let deleteAllButton = document.createElement('button');
deleteAllButton.innerText = 'Delete all';
deleteAllButton.classList.add('add-contact-btn');
deleteAllButton.classList.add('col-3');
deleteAllButton.addEventListener('click', deleteAllContacts);

// Attach delete all button
let addForm = document.getElementById('add-form');
addForm.appendChild(deleteAllButton);

/* ----------------------- FUNCTIONS ----------------------- */

// Function to add a new contact to the list
function addContact() {
    let name = nameInput.value;
    let number = numberInput.value;

    // If name and number are entered, add a new contact to contact list
    if (name && number) {
        let contact = { name, number };
        contacts.push(contact);

        // Create a new element for contact in contact list
        let contactList = document.getElementById('contacts');
        let contactItem = createContactElement(contact);
        contactList.appendChild(contactItem);

        // After contact is added, clear the input fields in form
        nameInput.value = '';
        numberInput.value = '';
    }
}

// Function to make sure none of the boxes in the add contact form are empty
function validateForm(nameInput, numberInput) {
    // Check if the error message already exists
    let errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.remove(); // Remove the existing error message
    }

    // Give error message if any of the boxes are empty
    if (nameInput.length === 0 || numberInput.length === 0) {
        let addForm = document.getElementById('add-form');
        errorMessage = document.createElement('h4');
        errorMessage.id = 'error-message';
        errorMessage.textContent = 'Forgot something? Add both a name and a number!';
        errorMessage.classList.add('col-6');
        addForm.appendChild(errorMessage);
    }
}

// Function to delete all contacts on the contact list 
function deleteAllContacts() {
    let contactsList = document.getElementById('contacts');
    while (contactsList.firstChild) {
        contactsList.firstChild.remove();
    }
}

// Function to create an edit button
function createEditButton(nameInput, numberInput) {
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.classList.add('buttons');
    editButton.addEventListener('click', function() {
        handleEditClick(nameInput, numberInput, editButton);
    });
    return editButton;
}

// Function to create a delete button
function createDeleteButton(contact, contactItem) {
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('buttons');
    deleteButton.addEventListener('click', function() {
        handleDeleteClick(contact, contactItem);
    });    
    return deleteButton;
}

// Function to manage what happens in the event listener on edit button
function handleEditClick(nameInput, numberInput, editButton) {
    // Reset the error flag and remove any previously displayed error messages
    let isError = false; // Flag to track if there's an error
    let errorMessage2 = document.getElementById('error-message2');
    if (errorMessage2) {
        errorMessage2.remove();
    }
    if (!isEditing) {
        // If not currently editing, enable editing
        nameInput.disabled = false;
        numberInput.disabled = false;
        editButton.innerText = 'Save';
        isEditing = true;
    } else if (nameInput.value.trim() === '' || numberInput.value.trim() === '') {
        // If any inputs are empty, display the error message
        let contactList = document.getElementById('contact-list');
        errorMessage2 = document.createElement('h4');
        errorMessage2.id = 'error-message2';
        errorMessage2.textContent = 'You cannot leave any empty boxes when changing a contact!';
        // Declare and insert errorMessage2 before the first child
        let firstChild = contactList.firstChild;
        contactList.insertBefore(errorMessage2, firstChild);
        isError = true;  // Set the error flag to true
    } else {
        // If there's no error, save changes and exit editing
        nameInput.disabled = true;
        numberInput.disabled = true;
        editButton.innerText = 'Edit';
        isEditing = false;
    }
}

// Function to manage what happens in the event listener on delete button
function handleDeleteClick(contact, contactItem) {
    let index = contacts.indexOf(contact);
    if (index > -1) {
        contacts.splice(index, 1);
        contactItem.remove();
    }
}
