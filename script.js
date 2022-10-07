// Library Array
const booksArray = JSON.parse(localStorage.getItem('my-library')) || [];

// Local Storage Setter
const storeBooks = () => localStorage.setItem('my-library', JSON.stringify(booksArray));

// Gives each book back its 'info' function that was removed by JSON processes
booksArray.map(book => {
    book.info = function() {
        return `${this.title} by ${this.author}, has ${this.pageNumber} pages; it is ${this.readStatus}.`
    }
})

// HTML to JS Selectors
const bookDisplay = document.getElementById('book-display')
const bookForm = document.getElementById('book-form')

// Input Fields
const bookTitleInput = document.getElementById('bookTitleInput')
const authorInput = document.getElementById('authorInput')
const pageNumberInput = document.getElementById('pageNumbers')
const readStatus = document.getElementById('readStatus')

// Form Validation
bookTitleInput.addEventListener("input", () => {
    if (bookTitleInput.validity.valueMissing) {
        bookTitleInput.setCustomValidity("Book title cannot be blank!");
        bookTitleInput.reportValidity();
    } else {
        bookTitleInput.setCustomValidity("")
    }
})

authorInput.addEventListener("input", () => {
    if (authorInput.validity.valueMissing) {
        authorInput.setCustomValidity("Author name cannot be blank!");
        authorInput.reportValidity();
    } else {
        authorInput.setCustomValidity("");
    }
})

pageNumberInput.addEventListener("input", () => {
    if (pageNumberInput.validity.valueMissing) {
        pageNumberInput.setCustomValidity("Page numbers cannot be blank!");
        pageNumberInput.reportValidity();
    } else {
        pageNumberInput.setCustomValidity("");
    }
})

// Book Factory Function
const BookFactory = (title, author, pageNumber, readStatus) => {
    // returns an object with the information passed through as its properties
    return {
        title: title,
        author: author,
        pageNumber: pageNumber,
        readStatus: readStatus,
        info() {
            return `${this.title} by ${this.author}, has ${this.pageNumber} pages; it is ${this.readStatus}.`
        }
    }
}

//Add Book Button
bookForm.addEventListener('submit', (e) => {
    // prevents form submit to refresh website
    e.preventDefault();

    // Creates a book object depending on the inputs
    const book = BookFactory(bookTitleInput.value, authorInput.value, pageNumbers.value, readStatus.value);

    // pushes book object in to booksArray
    booksArray.push(book);

    // saves new booksArray to localStorage
    storeBooks();

    // renders book using DOM manipulation
    renderBooks()

    // clears previous book inputs
    bookTitleInput.value = '';
    authorInput.value = '';
    pageNumberInput.value = '';
    readStatus.value = 'unread';

});

//Renders books from array on to display w/ DOM Manipulation
const renderBooks = () => {
    // clears prev. DOM elements from screen, so it does not repeat
    bookDisplay.innerText = '' 

    booksArray.map(book => {
        //Display Books from booksArray
        const bookItem = document.createElement('div');
        bookItem.innerText = book.info();
        bookItem.className = "book-item";
        bookDisplay.appendChild(bookItem);

        //Adds container for buttons
        const btnContainer = document.createElement('div');
        btnContainer.className = "btn-container";
        bookItem.appendChild(btnContainer);

        //Adds remove buttons next to each book
        const removeBtn = document.createElement('button');
        removeBtn.innerText = "X";
        removeBtn.id = "remove-btn";
        btnContainer.appendChild(removeBtn);

        //Adds change read status buttons next to each book
        const changeStatusBtn = document.createElement('button');
        changeStatusBtn.innerText = "Change Read Status";
        changeStatusBtn.id = "change-status-btn";
        btnContainer.appendChild(changeStatusBtn);

        //Remove Button Functionality
        removeBtn.addEventListener('click', () => {
            booksArray.splice(booksArray.indexOf(book), 1)
            storeBooks();
            bookItem.remove();
        });
        
        // Read Status Change Button Functionality
        changeStatusBtn.addEventListener('click', () => {
            book.readStatus === "unread" ? 
            book.readStatus = "read" : book.readStatus = "unread";
            storeBooks();
            renderBooks();
        })
    })
};

// Initial render to load books in localStorage if it exists:
renderBooks();



