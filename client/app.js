import Book from './models/book.js';
import Store from './utilities/store.js';
import UI from './utilities/ui.js';

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if (title === '' || author === '' || isbn ==='' ) {
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else {
        // Instantiate Book
        const book = new Book(title, author, isbn);

        // Add Book to UI
        UI.addBookToList(book);

        // Add Book to local storage
        Store.addBook(book);

        // Show success message
        UI.showAlert('Book Added!', 'success');

        // Clear fields after submission
        UI.clearFields();
    }
   
});

// Event: Remove a Book (in UI and local storage) through event propagation
document.querySelector('#book-list').addEventListener( 'click', (e) => {
    
    // Remove book from UI
    UI.deleteBook(e.target);
    console.log(e.target);

    // Remove book from local storage
    const isbn = e.target.parentElement.previousElementSibling.textContent;
    Store.removeBook(isbn);
     
    // console.log(isbn);
    UI.showAlert('Book Removed!', 'success');


});

// Event: Toggle dark theme
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);