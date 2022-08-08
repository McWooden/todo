// create element
function buatElement(id, tugas, deskripsi, mulai, berakhir, selesai) {   
    // card
    const card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('id', id)

    // text card
    const cardText = document.createElement('div')
    cardText.classList.add('card-text')

    const textTitle = document.createElement('p')
    textTitle.innerText = tugas

    const deskripsiText = document.createElement('p')
    deskripsiText.classList.add('text-time')
    let deadline;
    if (mulai == '' && berakhir == '') {
        deadline = deskripsi
    } else {
        deadline = `${mulai} | ${berakhir}`
    }
    deskripsiText.innerHTML = deadline

    // btn card
    const cardBtn = document.createElement('div')
    cardBtn.classList.add('card-btn')

    const centang = document.createElement('span')
    centang.classList.add('centang')
    centang.innerHTML = '<img src="img/check-solid.svg">'
    centang.addEventListener('click', (e) => {
        pindahKeSudahSelesai(e.target.parentElement.parentElement.id)
    })

    const ulangi = document.createElement('span')
    ulangi.classList.add('ulangi')
    ulangi.innerHTML = '<img src="img/reply-solid.svg">'
    ulangi.addEventListener('click', (e) => {
        pindahKeBelumSelesai(e.target.parentElement.parentElement.id)
    })

    const buang = document.createElement('span')
    buang.classList.add('buang')
    buang.innerHTML = '<img src="img/trash-solid.svg">'
    buang.addEventListener('click', (e) => {
        buangDariSudahSelesai(e.target.parentElement.parentElement.id)
    })

    // penggabungan
    cardText.append(textTitle, deskripsiText)
    card.append(cardText, cardBtn)

    card.addEventListener('click', () => {
        deskripsiText.innerText = deskripsi
    })
    card.addEventListener('mouseleave', () => {
        deskripsiText.innerHTML = deadline
    })

    if (selesai) {
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