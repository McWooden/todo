let tugas = []
const myChache = 'todolist'


    // storage
    if (localStorage.getItem(myChache) == null) {
        localStorage.setItem(myChache, '')
    }
    function simpanProggress() {
        let simpanJSON = JSON.stringify(tugas)
        localStorage.setItem(myChache, simpanJSON)
    }
    function ambilProggress() {
        let ambilJSON = JSON.parse(localStorage.getItem(myChache))
        tugas = ambilJSON
    }

document.addEventListener('renderTugas', () => {
    document.getElementById('belum').innerHTML = ''
    document.getElementById('sudah').innerHTML = ''
    // dijadiin variable aja biar agak gampang di liat
    let tugasSelesai = tugas.filter(x => x.selesai == true).map(x => buatElement(x.id, x.tugas, x.deskripsi, x.mulai, x.berakhir, x.selesai))
    let tugasBelum = tugas.filter(x => x.selesai == false).map(x => buatElement(x.id, x.tugas, x.deskripsi, x.mulai, x.berakhir, x.selesai))
    simpanProggress()
})

window.addEventListener('load', () => {
    ambilProggress()
    document.dispatchEvent(new Event('renderTugas'))
})


const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    tugas.push({
        id: +new Date(),
        tugas: document.getElementById('tugas').value,
        deskripsi: document.getElementById('deskripsi').value,
        mulai: document.getElementById('mulai').value,
        berakhir: document.getElementById('tanggal').value,
        selesai: false
    })
    
    document.dispatchEvent(new Event('renderTugas'))
})

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
    centang.innerText = 'centang'
    centang.addEventListener('click', (e) => {
        pindahKeSudahSelesai(e.target.parentElement.parentElement.id)
    })

    const ulangi = document.createElement('span')
    ulangi.classList.add('ulangi')
    ulangi.innerText = 'ulangi'
    ulangi.addEventListener('click', (e) => {
        pindahKeBelumSelesai(e.target.parentElement.parentElement.id)
    })

    const buang = document.createElement('span')
    buang.classList.add('buang')
    buang.innerText = 'buang'
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

document.getElementById('copyBtn').addEventListener('click', copyClipboard)
function copyClipboard() {
    let result = ''
    tugas.map(x => {
        if(x.selesai == false) {
            if (x.mulai == '' && x.berakhir == '') {
                result += `[*${x.tugas}*\n${x.deskripsi}]\n\n`
                return
            }
            result += `[*${x.tugas}*\n${x.mulai} | ${x.berakhir}\n${x.deskripsi}]\n\n`
        }
    })
    let textResult = document.createElement('textarea')
    textResult.innerHTML = result + '\nhttps://mcwooden.github.io/todo/'
    textResult.style.userSelect = 'all'
    document.getElementById('copyArea').append(textResult)
    textResult.select()
    document.execCommand("copy")
    // navigator.clipboard.writeText(result).then(alert(result))
}

// api area
fetch('https://dummyjson.com/quotes/random')
.then(res => res.json())
.then(x => {
    document.getElementById('quote').innerText = `"${x.quote}"`
    document.getElementById('author').innerText = '- '+x.author
})
