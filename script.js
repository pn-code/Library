//Library Array

const myLibrary = []

// HTML to JS Selectors

const bookDisplay = document.getElementById('bookDisplay')
const bookForm = document.getElementById('book-form')

// input fields

const bookTitleInput = document.getElementById('bookTitleInput')
const authorInput = document.getElementById('authorInput')
const pageNumbers = document.getElementById('pageNumbers')
const readStatus = document.getElementById('readStatus')

//Book Constructor

// function Book(title, author, pages, read) {
//     this.title = title, 
//     this.author = author,
//     this.pages = pages
//     this.read = read
//     this.input = function () { 
//         return this.title + " by " + this.author + ", has " + this.pages + " pages. " 
//         + "READ STATUS: " +this.read
//     }
// }

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

    // pushes book object in to myLibrary array
    myLibrary.push(book);

    // renders book using DOM manipulation
    renderBooks()

    // clears previous book inputs
    bookTitleInput.value = '';
    authorInput.value = '';
    pageNumbers.value = '';
    readStatus.value = '';

});

//Renders books from array on to display w/ DOM Manipulation
const renderBooks = () => {
    // clears prev. DOM elements from screen, so it does not repeat
    bookDisplay.innerText = '' 

    myLibrary.map(book => {
        //Display Books from myLibrary array
        const bookItem = document.createElement('div');
        bookItem.innerText = book.info();
        bookDisplay.appendChild(bookItem);

        //Adds remove buttons next to each book
        const removeBtn = document.createElement('button')
        removeBtn.innerText = "X"
        bookItem.appendChild(removeBtn)

        //Adds change read status buttons next to each book
        const changeStatusBtn = document.createElement('button')
        changeStatusBtn.innerText = "Change Read Status"
        bookItem.appendChild(changeStatusBtn)

        //Remove Button Functionality
        removeBtn.addEventListener('click', () => {
            myLibrary.splice(myLibrary.indexOf(book), 1)
            bookItem.remove();
        });
        
        // Read Status Change Button Functionality
        changeStatusBtn.addEventListener('click', () => {
            book.readStatus === "unread" ? 
            book.readStatus = "read" : book.readStatus = "unread";
            renderBooks();
        })
    })
};





