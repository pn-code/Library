//Library Array

const myLibrary = []

// HTML to JS links

const bookDisplay = document.querySelector('#bookDisplay')
const addBookButton = document.querySelector('#addBookButton')

//input fields
const bookTitleInput = document.querySelector('#bookTitleInput')
const authorInput = document.querySelector('#authorInput')
const pageNumbers = document.querySelector('#pageNumbers')
const readStatus = document.querySelector('#readStatus')

//Book Constructor

function Book(title, author, pages, read) {
    this.title = title, 
    this.author = author,
    this.pages = pages
    this.read = read
    this.input = function () { 
        return this.title + " by " + this.author + ", has " + this.pages + " pages. " 
        + "READ STATUS: " +this.read
    }
}

//Clear Button
const clearAllButton = document.querySelector('#clearButton')
clearAllButton.addEventListener('click', () => {
    myLibrary.splice(0, Infinity)
    bookDisplay.innerText = ''
    }
)

//Updates Display w/ DOM Manipulation
function displayBooks(){
    bookDisplay.innerHTML = '' //clears array from screen, so it does not repeat

    for (let i = 0; i < myLibrary.length; i++){

        //Display Books from myLibrary array
        const bookDisplayContents = document.createElement('div')
        bookDisplayContents.innerText = myLibrary[i].input() // set div to book input
        bookDisplay.appendChild(bookDisplayContents)

        //Adds remove buttons next to each book
        const bookRemoveButton = document.createElement('button')
        bookRemoveButton.innerText = "Remove"
        bookDisplayContents.appendChild(bookRemoveButton)

        //Adds change read status buttons next to each book
        const bookChangeStatusButton = document.createElement('button')
        bookChangeStatusButton.innerText = "Change Read Status"
        bookDisplayContents.appendChild(bookChangeStatusButton)

        //Remove Button Functionality
        bookRemoveButton.addEventListener('click', () => {
            myLibrary.splice(i, 1)
            bookDisplayContents.innerText = ''
            }
        )
        
        //Read Status Change Button Functionality
        bookChangeStatusButton.addEventListener('click', () => {
            if (myLibrary[i].read == "unread"){
                myLibrary[i].read = "read"
                bookDisplayContents.innerText = ''
                displayBooks()
            }else{
                myLibrary[i].read = "unread"
                bookDisplayContents.innerText = ''
                displayBooks()

            }
        })

    }

}

//Add Book Button
addBookButton.addEventListener('click', () => {
    const book = new Book(bookTitleInput.value, authorInput.value, pageNumbers.value, readStatus.value);
    myLibrary.push(book);
    displayBooks();
    bookTitleInput.value = '';
    authorInput.value = '';
    pageNumbers.value = '';
    readStatus.value = '';
})

