'use strict'
const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 5


var gPageIdx = 0
var gBooks
var gFilterBy = { maxPrice: 200, minRate: 0, search: '' }

_createBooks()

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    console.log('books', books)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = [
            _createBook('book-one', 18.90, 2),
            _createBook('book-two', 60.65, 5),
            _createBook('book-three', 75.20, 8),
            _createBook('book-four', 96, 2),
            _createBook('book-five', 26, 1),
            _createBook('book-six', 74, 7),
            _createBook('book-seven', 62.20, 9),
            _createBook('book-eight', 46, 3),
            _createBook('book-nine', 76, 0),
            _createBook('book-ten', 13, 10)
        ]
    }

    gBooks = books
    // console.log('gBooks', gBooks)
    _saveBooksToStorage()
}
function _createBook(title, price, rate) {
    return {
        id: makeId(),
        title: title,
        price: price,
        rate: rate,
        imgUrl: `"img/${title}.jpg"`,
        desc: makeLorem(15),
    }
}
function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
function removeBook(bookId) {
    console.log('bookId', bookId)
    var removedBookId = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(removedBookId, 1)
    console.log('gBooks', gBooks)
    _saveBooksToStorage()
    renderBooks()
}
function addBook(addedBookName, addedBookPrice) {

    var newBook = _createBook(addedBookName, addedBookPrice)
    gBooks.push(newBook)
    _saveBooksToStorage()
    renderBooks()
}
function updateBook(bookId, bookPrice) {
    var updatedBook = gBooks.find(book => book.id === bookId)
    updatedBook.price = bookPrice
    _saveBooksToStorage()
    renderBooks()
}
function updateBookRatingPlus(bookId) {
    // console.log('bookId', bookId)
    var updatedBook = gBooks.find(book => book.id === bookId)
    // console.log('updatedBook', updatedBook)
    updatedBook.rate = updatedBook.rate + 1
    console.log('updatedBook', updatedBook)
    _saveBooksToStorage()
    renderBooks()
}
function updateBookRatingMinus(bookId) {
    // console.log('bookId', bookId)
    var updatedBook = gBooks.find(book => bookId === book.id)
    console.log('updatedBook', updatedBook)
    updatedBook.rate = updatedBook.rate - 1
    console.log('updatedBook', updatedBook)
    _saveBooksToStorage()
    renderBooks()
}
function getBookById(bookId) {
    // console.log('bookId', bookId)
    const book = gBooks.find(book => bookId === book.id)
    // console.log('book', book)
    return book
}
function setBookFilter(key, value) {
    console.log('key, value', key, value)
    gPageIdx = 0

    if (value !== undefined) gFilterBy[key] = value
    console.log('gFilterBy', gFilterBy)
    return gFilterBy
}
function getBooks() {
    var searchKey = gFilterBy.search
    console.log('searchKey', searchKey)

    if (searchKey) {
        var books = gBooks.filter(book => {
            // console.log('book', book)
            return book.title.includes(searchKey)
        })
    }
    else {
        books = gBooks.filter(book => {
            return book.price <= gFilterBy.maxPrice &&
                book.rate >= gFilterBy.minRate
        })
    }
    console.log('gBooks', gBooks)
    var startIdx = gPageIdx * PAGE_SIZE
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}
function nextPage() {
    if (gPageIdx * PAGE_SIZE >= gBooks.length - 1) {
        // gPageIdx = gPageIdx * PAGE_SIZE
        gPageIdx = 0
        console.log('gPageIdx too big', gPageIdx)
        // toggleDisableNext()
    } else {
        if (gPageIdx === 0) {
            // toggleDisablePrev()
        }
        gPageIdx++
        console.log('gPageIdx', gPageIdx)

    }
}
function prevPage() {
    if (gPageIdx * PAGE_SIZE <= 0) {
        gPageIdx = 0
        // toggleDisablePrev()
        console.log('gPageIdx too small', gPageIdx)
    }
    else {
        if (gPageIdx * PAGE_SIZE >= gBooks.length - 1) {
            // toggleDisableNext()
        }
        gPageIdx--
        console.log('gPageIdx', gPageIdx)
    }
}


