'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
    // doTrans()
}
function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(book => `
    <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>${book.rate}</td>
            <td><img src=${book.imgUrl} onerror="this.src='../img/book-one.jpg';" /></td>
            <td><button data-trans="read-btn" class="btnRead" onclick="onReadBook('${book.id}')">read</button></td>
            <td><button data-trans="update-btn" class="btnUpdate" onclick="onUpdateBook('${book.id}')">update</button></td>
            <td><button data-trans="delete-btn" class="btnDelete" onclick="onRemoveBook('${book.id}')">delete</button></td>
     </tr> `
    )
    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}
function onAddBook() {
    // add protection against null
    var addedBookName = prompt('book name?')
    var addedBookPrice = prompt('book price?')
    console.log('addedBookName, addedBookPrice', addedBookName, addedBookPrice)
    addBook(addedBookName, addedBookPrice)
}
function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('.bookId').innerText = book.id
    elModal.querySelector('.bookTitle').innerText = book.title
    elModal.querySelector('.bookPrice').innerText = book.price
    elModal.querySelector('.rate').innerText = book.rate
    elModal.classList.add('open')
}
function onRemoveBook(bookId) {
    removeBook(bookId)
}
function onUpdateBook(bookId) {
    var bookPrice = prompt('new book price?')
    updateBook(bookId, bookPrice)
}
function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}
function onPlusRate() {
    var elModal = document.querySelector('.modal')
    var ElbookId = elModal.querySelector('.bookId').innerText
    updateBookRatingPlus(ElbookId)
    updateModalRating(ElbookId)
    renderBooks()
}
function onMinusRate() {
    var elModal = document.querySelector('.modal')
    var ElbookId = elModal.querySelector('.bookId').innerText
    updateBookRatingMinus(ElbookId)
    updateModalRating(ElbookId)
    renderBooks()
}
function updateModalRating(ElbookId) {
    var book = getBookById(ElbookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('.rate').innerText = book.rate
}
function onSetFilterBy(key, value) {
    // console.log('key, value', key, value)
    var filterBy = setBookFilter(key, value)
    console.log('filterBy', filterBy)
    renderBooks()
    const queryStringParams = `?maxPrice=${gFilterBy.maxPrice}&minRate=${gFilterBy.minRate}&search=${gFilterBy.search}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}
function onSearch() {
    var userSearch = document.querySelector('.search').value
    console.log(userSearch)
    onSetFilterBy('search', userSearch)

}
function onNextPage() {
    var elPrevBtn = document.querySelector('.btnBack')
    elPrevBtn.classList.contains('disabled') ? elPrevBtn.classList.remove('disabled') : ''
    nextPage()
    renderBooks()
}
function onPrevPage() {
    var elNextBtn = document.querySelector('.btnNext')
    elNextBtn.classList.contains('disabled') ? elNextBtn.classList.remove('disabled') : ''
    prevPage()
    renderBooks()
}
function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 0,
        minRate: +queryStringParams.get('minRate') || 0,
        search: queryStringParams.get('search') || ''
    }
    console.log('filterBy', filterBy)
    if (!filterBy.maxPrice && !filterBy.minRate && !filterBy.search) return

    var priceFilter = document.querySelector('.filter-price').value = filterBy.maxPrice
    var rateFilter = document.querySelector('.filter-rate').value = filterBy.minRate
    var searchFilter = document.querySelector('.search').value = filterBy.search

    console.log('filterBy.search', filterBy.search)

    setBookFilter('maxPrice', filterBy.maxPrice)
    setBookFilter('minRate', filterBy.minRate)
    setBookFilter('search', filterBy.search)
}
function toggleDisableNext() {
    var elNextBtn = document.querySelector('.btnNext')

    if (elNextBtn.disabled) {
        elNextBtn.disabled = false
        console.log('elNextBtn.disabled', elNextBtn.disabled)
    } else {
        elNextBtn.disabled = true
        console.log('elNextBtn.disabled', elNextBtn.disabled)
    }

}
function toggleDisablePrev() {
    var elPrevBtn = document.querySelector('.btnBack')

    if (elPrevBtn.disabled) {
        elPrevBtn.disabled = false
        console.log('elPrevBtn.disabled', elPrevBtn.disabled)
    } else {
        elPrevBtn.disabled = true
        console.log('elPrevBtn.disabled', elPrevBtn.disabled)
    }
}
function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}