let tugas = []
const myChache = 'todolist'


// window on load
window.addEventListener('load', () => {
    ambilProggress()
    document.dispatchEvent(new Event('renderTugas'))
    minimize()
    greet()
})

// render Element
document.addEventListener('renderTugas', () => {
    document.getElementById('belum').innerHTML = ''
    document.getElementById('sudah').innerHTML = ''
    tugas.map(x => buatElement(x))
    simpanProggress()
    updateProggress()
})

//  form on submit
const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    tugas.push({
        id: +new Date(),
        tugas: document.getElementById('tugas').value,
        deskripsi: document.getElementById('deskripsi').value,
        color: document.getElementById('color').value,
        mulai: document.getElementById('mulai').value,
        berakhir: document.getElementById('tanggal').value,
        selesai: false
    })
    
    document.dispatchEvent(new Event('renderTugas'))
    rotateSubmitButton()
})

// animate btn submit 
function rotateSubmitButton() {
    const btnSubmit = document.getElementById('submitImg')
    btnSubmit.style.animation = 'rotate .3s'
    setTimeout(() => {
        btnSubmit.style.animation = ''
    }, 300)
}

// copy "belumDilakukan" list
document.getElementById('copyBtn').addEventListener('click', copyClipboard)
function copyClipboard() {
    let result = ''
    let textResult = document.createElement('textarea')
    textResult.style.userSelect = 'all'

    // creating text
    tugas.map(x => {
        if(x.selesai == false) {
            if (x.mulai == '' && x.berakhir == '') {
                result += `[${x.tugas}\n${x.deskripsi}]\n\n`
                return
            }
            result += `${x.tugas}\n${x.mulai} | ${x.berakhir}\n${x.deskripsi}\n\n`
        }
    })
    textResult.innerHTML = result + '\nhttps://mcwooden.github.io/todo/'

    // append textarea
    document.getElementById('copyArea').append(textResult)

    // copy
    textResult.select()
    document.execCommand("Copy")

    // hide textarea
    document.getElementById('copyArea').innerHTML = ''
}

fetch("https://jservice.io/api/random")
.then(res => res.json())
.then(x => {
    document.getElementById('quote').innerHTML = x[0].question
    document.getElementById('author').innerHTML = `Level ${x[0].value}`
    document.getElementById('author').addEventListener('click', () => document.getElementById('author').innerHTML = x[0].answer)
    document.getElementById('trivia').style.display = 'block'
    document.getElementById('header').style.top = 'auto'
})

// styling
// make footer marginBottom = height nav
document.getElementById('footer').style.marginBottom = (document.getElementById('nav').offsetHeight + 15) + 'px'

// form state
let formState = {
    isMinimize: true
}
function minimize(e) {
    if (formState.isMinimize) {
        document.getElementById('form').style.height = '0'
        formState.isMinimize = false
        document.getElementById('minimize').style.transform = 'rotate(0deg)'
        document.getElementById('buttonToSubmit').style.visibility = 'hidden'
    } else {
        document.getElementById('form').style.height = '235px'
        formState.isMinimize = true
        document.getElementById('minimize').style.transform = 'rotate(180deg)'
        document.getElementById('buttonToSubmit').style.visibility = 'visible'
    }
}
document.getElementById('minimize').addEventListener('click', minimize) 

// update proggres
function updateProggress() {
    if (tugas.length === 0) {
        document.getElementById('proggress').style.display = 'none'
    }
    const tugasSelesai = tugas.filter(x => !x.selesai)
    const tugasBelum = tugas.filter(x => x.selesai)
    document.getElementById('valueBar').style.width = Math.round((tugasSelesai.length / tugas.length)*100) + '%'
    document.getElementById('valueBarRed').style.width = Math.round((tugasBelum.length / tugas.length)*100) + '%'
}

// greet
function greet() {
    const hours = new Date().getHours()
    if (hours >= 18) {
        document.getElementById('greet').innerText = 'Selamat malam'
    } else if (hours >= 12) {
        document.getElementById('greet').innerText = 'Selamat Siang'
    } else {
        document.getElementById('greet').innerText = 'Selamat Pagi'
    }
}
const dayName = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']
const monthName = ['Januari','Februari','Maret','April','Mei','Juni','Juni','Agustus','September','Oktober','November','November']
function getDate() {
    document.getElementById('dateNow').innerText = new Date().getDate()
    document.getElementById('day').innerText = dayName[new Date().getDay()]
    document.getElementById('month').innerText = monthName[new Date().getMonth()]
    document.getElementById('year').innerText = new Date().getFullYear()
}
getDate()

// history

function editCard() {
    document.getElementById('tugas').value = tugas[0].tugas
    document.getElementById('deskripsi').value = tugas[0].deskripsi
    document.getElementById('mulai').value = tugas[0].mulai
    document.getElementById('tanggal').value = tugas[0].berakhir
    document.getElementById('color').value = tugas[0].color
}