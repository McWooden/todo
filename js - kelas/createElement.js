// create element
const url = 'https://x6todo.herokuapp.com/x6'
function buatElement(x, index) {   
    // card
    const card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('id', x._id)

    // text card
    const cardText = document.createElement('div')
    cardText.classList.add('card-text')

    const textTitle = document.createElement('p')
    textTitle.innerText = x.tugas

    const deskripsiText = document.createElement('p')
    deskripsiText.classList.add('text-time')
    let deadline;
    if (x.mulai == '' && x.berakhir == '') {
        deadline = x.deskripsi
    } else {
        deadline = `${x.mulai} | ${x.berakhir}`
    }
    deskripsiText.innerHTML = deadline

    // btn card
    const cardBtn = document.createElement('div')
    cardBtn.classList.add('card-btn')

    const centang = document.createElement('img')
    centang.classList.add('centang')
    centang.setAttribute('src', 'img/check-solid.svg')
    centang.addEventListener('click', (e) => {
        reverse({id: x._id, selesai: x.selesai})
        popup(alertMsg.check)
    })

    const ulangi = document.createElement('img')
    ulangi.classList.add('ulangi')
    ulangi.setAttribute('src', 'img/reply-solid.svg')
    ulangi.addEventListener('click', (e) => {
        reverse({id: x._id, selesai: x.selesai})
        popup(alertMsg.reply)
    })

    const buang = document.createElement('img')
    buang.classList.add('buang')
    buang.setAttribute('src', 'img/trash-solid.svg')
    buang.addEventListener('click', (e) => {
        deleteItem(x._id)
        popup(alertMsg.delete)
    })
    // edit btn
    const editBtn = document.createElement('img')
    editBtn.classList.add('editBtn')
    if (x.selesai) {
        editBtn.setAttribute('src', 'img/pen-to-square-solid-dark.svg')
    } else {
        editBtn.setAttribute('src', 'img/pen-to-square-solid.svg')
    }
    editBtn.addEventListener('click', () => {
        editCard(index)
        popup(alertMsg.edit)
    })

    // penggabungan
    cardText.append(textTitle, deskripsiText)
    card.append(cardText, cardBtn, editBtn)

    card.addEventListener('click', () => {
        deskripsiText.innerText = x.deskripsi
    })
    card.addEventListener('mouseleave', () => {
        deskripsiText.innerHTML = deadline
    })
    // dataset
    card.dataset.cardIndex = index
    // style
    card.style.borderLeftColor = x.color
    
    if (x.selesai) {
        cardBtn.append(ulangi, buang)
        return document.getElementById('sudah').appendChild(card)
    } else {
        cardBtn.append(centang)
        return document.getElementById('belum').appendChild(card)
    }
}

function reverse(json) {
    fetch(`${url}/reverse`, {
        method: "PUT",
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
        },
    })
}
function deleteItem(id) {
    fetch(`${url}/${id}`,  { method: 'delete' })
}