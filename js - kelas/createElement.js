// create element
const url = 'https://x6todo.herokuapp.com/x6'
const urlLocal = 'http://localhost:3000/x6'

const akun = JSON.parse(localStorage.getItem('akun'))
const nickname = akun.nickname
const title = akun.title
const token = akun.pass

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
        reverse({id: x._id, selesai: x.selesai, token})
        popup(alertMsg.check)
    })

    const ulangi = document.createElement('img')
    ulangi.classList.add('ulangi')
    ulangi.setAttribute('src', 'img/reply-solid.svg')
    ulangi.addEventListener('click', (e) => {
        reverse({id: x._id, selesai: x.selesai, token})
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
    editBtn.addEventListener('click', async () => {
        await editCard(x._id)
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

    if (title != 'Owner' || title != 'Admin') {
        editBtn.style.display = 'none'
    }
    if (title != 'Owner' || title != 'Admin' || title != 'X-6') {
        cardBtn.style.display = 'none'
    }
    
    if (x.selesai) {
        cardBtn.append(ulangi, buang)
        return document.getElementById('sudah').appendChild(card)
    } else {
        cardBtn.append(centang)
        return document.getElementById('belum').appendChild(card)
    }
}

async function reverse(json) {
    await fetch(`${url}/reverse`, {
        method: "PUT",
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(cardHilang(json.id))
}
async function deleteItem(id) {
    await fetch(`${url}/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({token: token}),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(cardHilang(id))
}
async function editCard(id) {
    await fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({token}),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(res => res.json()).then(x => {
            formState.isEdit = true
            document.getElementById('tugas').value = x.tugas
            document.getElementById('deskripsi').value = x.deskripsi
            document.getElementById('mulai').value = x.mulai
            document.getElementById('tanggal').value = x.berakhir
            document.getElementById('color').value = x.color
            if (document.getElementById('color').value == '#000000') {
                document.getElementById('color').value = '#31364c'
            }
            document.getElementById('btnUpdate').style.visibility = 'visible'
            getEditStatus(x)
    })
}
function getEditStatus(x) {
    document.getElementById('dateNow').innerText = ''
    document.getElementById('day').innerText = x.tugas
    document.getElementById('month').innerText = x._id
    document.getElementById('year').innerText = x.selesai
    document.getElementById('greet').innerText = 'Mengubah data:' 
}
document.getElementById('btnUpdate').addEventListener('click', (e) => {
    e.preventDefault()
    saveEdit()
    kembalikanKeDefault()
})
async function saveEdit() {
    await fetch(`${url}/`, {
        method: "PUT",
        body: JSON.stringify({
            id: document.getElementById('month').textContent,
            tugas: document.getElementById('tugas').value,
            deskripsi: document.getElementById('deskripsi').value,
            color: document.getElementById('color').value,
            mulai: document.getElementById('mulai').value,
            berakhir: document.getElementById('tanggal').value,
            token,
            nickname
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    document.dispatchEvent(new Event('renderTugas'))
    popup(alertMsg.save)
}
function cardHilang(x) {
    document.getElementById(x).style.opacity = '0'
    setTimeout(() => {
        document.getElementById(x).style.visibility = 'hidden'
    }, 300)
}