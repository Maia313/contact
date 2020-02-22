
let updatedContacts = []
for (let i = 0; i < contacts.length; i++) {
    let isFavourite = contacts[i].isFavourite = false
    let updatedContactItem = { ...contacts[i], isFavourite }
    updatedContacts.push(updatedContactItem)
}

window.onload = function () {

    const contactDetails = document.getElementById('contact-details')
    const contactList = document.getElementById('contact-list')
    const favouriteList = document.getElementById('favourite-list')

    const contactFilter = document.getElementById('contact-filter')

    const createListItems = (list, i) => {
        let el = document.createElement('div')
        el.innerHTML = list[i].name
        el.className = 'contact-name'
        el.id = i
        return el
    }

    const showContactList = (list) => {

        for (let i = 0; i < list.length; i++) {
            const listItem = createListItems(list, i)
            contactList.appendChild(listItem)
            viewDetails(listItem)
        }
    }

    const renderDetails = (list, starImg, name, email) => {
        list.innerHTML =
            "<div class='details'><span id='star'>" + starImg +
            "</span><span id='close-details'>" +
            "<img class='close' src='assets/close.svg' alt='close'></span>" +
            "<h4>" + name + "</h4>" +
            "<p>" + email + "</p></div>"

    }

    const viewDetails = (item) => {
        item.onclick = () => {

            let contactId = item.id
            const starImgFilled = "<img src='assets/star.svg' alt='star'>"
            const starImgBorder = "<img src='assets/star_border.svg' alt='star'>"
            const name = updatedContacts[contactId].name
            const email = updatedContacts[contactId].email

            contactList.classList.add('hidden')
            favouriteList.classList.add('hidden')
            if (item.parentNode.id == 'favourite-list') {
                renderDetails(contactDetails, starImgFilled, name, email)
            } else {
                renderDetails(contactDetails, starImgBorder, name, email)
            }

            contactDetails.style.background = '#b7c0ce'
            contactDetails.setAttribute('class', '')
            const star = document.getElementById('star')

            star.onclick = () => {
                toggleFavourite(item)
            }
            closeElementDetails()
        }

    }

    const toggleFavourite = (item) => {
        const star = document.getElementById('star')
        favouriteList.appendChild(document.getElementById(item.id))

        if (updatedContacts[item.id].isFavourite) {
            contactList.appendChild(document.getElementById(item.id))
            updatedContacts[item.id].isFavourite = !updatedContacts[item.id].isFavourite
            star.firstChild.src = 'assets/star_border.svg'
        } else {
            updatedContacts[item.id].isFavourite = !updatedContacts[item.id].isFavourite
            star.firstChild.src = 'assets/star.svg'
        }

    }

    const closeElementDetails = () => {
        document.getElementById('close-details').onclick = () => {
            document.getElementById('close-details').parentNode.remove()
            contactDetails.style.background = 'transparent'
            if (contactFilter.innerHTML == 'Visa alla') {
                favouriteList.classList.remove('hidden')
                contactDetails.classList.add('hidden')
            } else {
                contactList.classList.remove('hidden')
                contactDetails.classList.add('hidden')
            }
        }

    }

    const filterList = () => {
        contactFilter.onclick = () => {
            if (contactFilter.innerHTML == 'Filtrera favoriter') {
                contactFilter.innerHTML = 'Visa alla'
                contactList.classList.add('hidden')
                favouriteList.classList.remove('hidden')
                contactDetails.classList.add('hidden')
            } else {
                contactFilter.innerHTML = 'Filtrera favoriter'
                contactList.classList.remove('hidden')
                favouriteList.classList.add('hidden')
                contactDetails.classList.add('hidden')
            }
        }
    }

    const searchList = () => {
        const inputField = document.getElementById('search')
        const contactSearch = document.getElementById('contact-search')
        const searchBtn = document.getElementById('search-button')

        inputField.oninput = (e) => {
            searchForEl(contactList, e.target.value)
            searchForEl(favouriteList, e.target.value)
        }

        searchBtn.onclick = () => {
            searchForEl(contactList, inputField.value)
            searchForEl(favouriteList, inputField.value)

            contactSearch.reset()
        }

        inputField.value = ''

    }

    const searchForEl = (list, el) => {
        for (let i = 0; i < list.childNodes.length; i++) {
            const name = list.childNodes[i].innerHTML
            if (name.toLowerCase().indexOf(el) > -1) {
                list.childNodes[i].style.display = ''
            } else {
                list.childNodes[i].style.display = 'none'
            }
        }
    }

    filterList()
    searchList()
    showContactList(updatedContacts)
}