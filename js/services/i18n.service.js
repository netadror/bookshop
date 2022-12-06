var gCurrLang = 'en'
var gTrans = {
    // site title
    'main-title': {
        en: 'Bookshop App',
        he: 'אפליקצית חנות ספרים',
    },
    // filter bar
    'filter-title': {
        en: 'Add',
        he: 'סינון',
    },
    'max-title': {
        en: 'Title',
        he: 'מחיר מקסימלי',
    },
    'min-title': {
        en: 'Add',
        he: 'דירוג מינימלי',
    },
    'search-bar-label': {
        en: 'Title',
        he: 'שם הספר'
    },
    'search-bar-placeholder': {
        en: 'Enter book name',
        he: 'הכנס שם ספר',
    },
    'search-bar-btn': {
        en: 'Search',
        he: 'חפש'
    },

    // 'search-bar-input': {
    //     en: 'Add',
    //     he: 'הוסף',
    // },

    // table
    'book-id': {
        en: 'ID',
        he: 'מספר סידורי'
    },
    'book-title': {
        en: 'Title',
        he: 'שם הספר'
    },
    price: {
        en: 'price',
        he: 'מחיר'
    },
    rate: {
        en: 'rate',
        he: 'דירוג',
    },
    actions: {
        en: 'actions',
        he: 'פעולות'
    },
    'read-btn': {
        en: 'read',
        he: 'קרא עוד',
    },
    'update-btn': {
        en: 'update',
        he: 'עדכון',
    },
    'delete-btn': {
        en: 'delete',
        he: 'מחק',
    },
    // modal
    'modal-book-id': {
        en: 'Book Id',
        he: 'מספר סידורי',
    },
    'modal-book-title': {
        en: 'Book title',
        he: 'שם הספר',
    },
    'modal-book-price': {
        en: 'Book Price',
        he: 'מחיר הספר',
    },
    'modal-book-descp': {
        en: 'Book Description',
        he: 'תיאור הספר',
    },
    'modal-book-rate': {
        en: 'Book Rating',
        he: 'דירוג הספר',
    },
    'modal-close-btn': {
        en: 'Close',
        he: 'סגור',
    },
    // page buttons
    'next-page-btn': {
        en: 'Next Page',
        he: 'עמוד הבא',
    },
    'prev-page-btn': {
        en: 'Previous Page',
        he: 'עמוד קודם'
    }
}


function getTrans(transKey) {
    // done: if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // done: get from gTrans
    var translation = key[gCurrLang]

    // done: If translation not found - use english
    if (!translation) translation = key.en

    return translation
}

function doTrans() {
    // done: 
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        // done: support placeholder    
        if (el.placeholder) el.placeholder = translation
    })
}
function setLang(lang) {
    gCurrLang = lang
}

function formatNumSimple(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
    return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
    return kg * 2.20462262185
}


function getPastRelativeFrom(ts) {
    const diff = Date.now() - new Date(ts)
    const seconds = diff / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    const formatter = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'auto'
    })
    if (seconds <= 60) return formatter.format(-seconds, 'seconds')
    if (minutes <= 60) return formatter.format(-minutes, 'minutes')
    if (hours <= 24) return formatter.format(-hours, 'hours')
    return formatter.format(-days, 'days')
}