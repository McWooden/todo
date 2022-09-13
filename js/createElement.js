// create element
function buatElement(x, index) {   
    // card
    const card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('id', x.id)

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
        pindahKeSudahSelesai(e.target.parentElement.parentElement.id)
        popup(alertMsg.check)
    })

    const ulangi = document.createElement('img')
    ulangi.classList.add('ulangi')
    ulangi.setAttribute('src', 'img/reply-solid.svg')
    ulangi.addEventListener('click', (e) => {
        pindahKeBelumSelesai(e.target.parentElement.parentElement.id)
        popup(alertMsg.reply)
    })

    const buang = document.createElement('img')
    buang.classList.add('buang')
    buang.setAttribute('src', 'img/trash-solid.svg')
    buang.addEventListener('click', (e) => {
        buangDariSudahSelesai(e.target.parentElement.parentElement.id)
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

// element option
function pindahKeSudahSelesai(idYangDiCari) {
    for (let i in tugas) {
        if (tugas[i].id == idYangDiCari) {
            tugas[i].selesai = true
            document.dispatchEvent(new Event('renderTugas'))
        }
    }
}

function pindahKeBelumSelesai(idYangDiCari) {
    for (let i in tugas) {
        if (tugas[i].id == idYangDiCari) {
            tugas[i].selesai = false
            document.dispatchEvent(new Event('renderTugas'))
        }
    }
}

function buangDariSudahSelesai(idYangDiCari) {
    for (let i in tugas) {
        if (tugas[i].id == idYangDiCari) {
            tugas.splice(i, 1)
            document.dispatchEvent(new Event('renderTugas'))
        }
    }
}

// edit area
function editCard(x) {
    formState.isEdit = true
    document.getElementById('tugas').value = tugas[x].tugas
    document.getElementById('deskripsi').value = tugas[x].deskripsi
    document.getElementById('mulai').value = tugas[x].mulai
    document.getElementById('tanggal').value = tugas[x].berakhir
    document.getElementById('color').value = tugas[x].color
    if (document.getElementById('color').value == '#000000') {
        document.getElementById('color').value = '#31364c'
    }
    document.getElementById('btnUpdate').style.visibility = 'visible'
    document.getElementById('btnUpdate').dataset.key = x
    getEditStatus(x)
}
document.getElementById('btnUpdate').addEventListener('click', (e) => {
    e.preventDefault()
    saveEdit(document.getElementById('btnUpdate').dataset.key)
    kembalikanKeDefault()
})
function getEditStatus(x) {
    document.getElementById('dateNow').innerText = x
    document.getElementById('day').innerText = tugas[x].tugas
    document.getElementById('month').innerText = '#' + tugas[x].id
    document.getElementById('year').innerText = tugas[x].selesai
    document.getElementById('greet').innerText = 'Mengubah data:' 
}
// save edit
function saveEdit(x) {
    tugas[x].tugas = document.getElementById('tugas').value
    tugas[x].deskripsi = document.getElementById('deskripsi').value
    tugas[x].color = document.getElementById('color').value
    tugas[x].mulai = document.getElementById('mulai').value
    tugas[x].berakhir = document.getElementById('tanggal').value
    document.dispatchEvent(new Event('renderTugas'))
    popup(alertMsg.save)
}