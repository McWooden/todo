const url = 'https://x6todo.herokuapp.com/x6'
const urlLocal = 'http://localhost:3000/x6'

let link = {
    Beranda: '/',
    Twit: '/twit',
    Log: '/log'
}

let modeState = 'Beranda'

const akun = JSON.parse(localStorage.getItem('akun'))
const nickname = akun.nickname
const title = akun.title
const token = akun.pass

// window on load
window.addEventListener('load', () => {
    document.dispatchEvent(new Event('renderTugas'))
    minimize()
    greet()
    getDate()
    refresh()
    roles()
    mode()
})
document.getElementById('reload').addEventListener('click', () => {
    document.dispatchEvent(new Event('renderTugas'))
})

// render Element
document.addEventListener('renderTugas', () => {
    if (modeState == 'Twit') {
        fetch(`${url}${link.Twit}`)
        .then(res => res.json())
        .then(twits => {
            document.getElementById('belum').innerHTML = ''
            document.getElementById('sudah').innerHTML = ''
            let twit = twits.reverse()
            twit.map(item => new Twit(item).showTwit())
            popup(alertMsg.reload)
            updateProggress(twits)
        }).catch((err) => {
            showError(err)
        })
    } else {
        fetch(url)
        .then(res => res.json())
        .then(tasks => {
            document.getElementById('belum').innerHTML = ''
            document.getElementById('sudah').innerHTML = ''
            let tugas = tasks.reverse()
            tugas.map(item => new Card(item).showCard())
            popup(alertMsg.reload)
            updateProggress(tasks)
        }).catch((err) => {
            showError(err)
        })
    }
})

//  form on submit
const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {    
    e.preventDefault()
    const data = {
        tugas: document.getElementById('tugas').value,
        deskripsi: document.getElementById('deskripsi').value,
        color: document.getElementById('color').value,
        mulai: document.getElementById('mulai').value,
        berakhir: document.getElementById('tanggal').value,
        by: nickname,
        token,
        selesai: false
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    await fetch(url, options).then(form.reset())

    document.dispatchEvent(new Event('renderTugas'))
    rotateSubmitButton()
    popup(alertMsg.add)
})
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

// animate btn submit 
function rotateSubmitButton() {
    const btnSubmit = document.getElementById('submitImg')
    btnSubmit.style.animation = 'rotate .3s'
    setTimeout(() => {
        btnSubmit.style.animation = ''
    }, 300)
}

// styling
document.getElementById('trivia').style.display = 'block'
document.getElementById('header').style.top = 'auto'
document.getElementById('footer').style.marginBottom = (document.getElementById('nav').offsetHeight + 15) + 'px'

// form state
let formState = {
    isMinimize: true,
    isEdit: false,
}
document.getElementById('deskripsi').style.width = (document.getElementById('tugas').offsetWidth - 1) + 'px'

function minimize() {
    if (formState.isMinimize) {
        document.getElementById('form').style.height = '0'
        formState.isMinimize = false
        document.getElementById('minimize').style.transform = 'rotate(0deg)'
        if (document.getElementById('tugas').value == '') {
            document.getElementById('buttonToSubmit').style.visibility = 'hidden'
        }
    } else {
        document.getElementById('form').style.height = '235px'
        formState.isMinimize = true
        document.getElementById('minimize').style.transform = 'rotate(180deg)'
        if (!formState.isEdit) {
            document.getElementById('buttonToSubmit').style.visibility = 'visible'
        } else if (!formState.isEdit) {
            document.getElementById('buttonToSubmit').style.visibility = 'hidden'
        }
    }
}
document.getElementById('minimize').addEventListener('click', minimize) 

// update proggres
function updateProggress(tasks) {
    if (tasks.length === 0 || modeState != 'Beranda') {
        document.getElementById('proggress').style.display = 'none'
    }
    const tugasSelesai = tasks.filter(x => !x.selesai)
    const tugasBelum = tasks.filter(x => x.selesai)
    document.getElementById('valueBar').style.width = Math.round((tugasSelesai.length / tasks.length)*100) + '%'
    document.getElementById('valueBarRed').style.width = Math.round((tugasBelum.length / tasks.length)*100) + '%'
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

function kembalikanKeDefault() {
    document.getElementById('tugas').value = ''
    document.getElementById('deskripsi').value = ''
    document.getElementById('mulai').value = ''
    document.getElementById('tanggal').value = ''
    document.getElementById('color').value = '#31364c'
    greet()
    getDate()
    formState.isEdit = false
    document.getElementById('btnUpdate').style.visibility = 'hidden'
}

// pop up :)
alertMsg = {
    reload: {
        link: 'img/rotate-right-solid.svg',
        bgColor: '#0D7377'
    },
    add: {
        link: 'img/plus-solid.svg',
        bgColor: '#A27B5C'
    },
    delete: {
        link: 'img/trash-solid-white.svg',
        bgColor: '#774360'
    },
    check: {
        link: 'img/check-solid.svg',
        bgColor: '#0D7377'
    },
    reply: {
        link: 'img/reply-solid.svg',
        bgColor: '#A27B5C'
    },
    edit: {
        link: 'img/pen-to-square-solid.svg',
        bgColor: '#2b2f42'
    },
    save: {
        link: 'img/floppy-disk-solid.svg',
        bgColor: '#277BC0'
    }
}

function popup(imgLink) {
    const alertImg = document.createElement('img')
    alertImg.src = imgLink.link
    alertImg.style.backgroundColor = imgLink.bgColor
    document.getElementById('alert').appendChild(alertImg)

    setTimeout(() => {
        alertImg.style.opacity = '0'
        alertImg.style.transform = 'translateX(-5px)'
    }, 2000)
    setTimeout(() => {
        alertImg.remove()
    }, 2100)
}

function refresh() {
    let akun = JSON.parse(localStorage.getItem('akun'))
    document.getElementById('nama').textContent = akun.nickname
    document.getElementById('rank').textContent = akun.title
    if (akun.nickname == '') {
        document.getElementById('login').style.display = 'inherit'
    } else {
        document.getElementById('login').style.display = 'none'
    }
}

function roles() {
    document.getElementById('buttonToSubmit').style.opacity = '.1'
    form.style.opacity = '.5'
    if (title == 'Owner' || title == 'Admin') {
        document.getElementById('buttonToSubmit').style.opacity = '1'
        form.style.opacity = '1'
    }
}

function showError(msg) {
    const card = document.createElement('div')
    const cardText = document.createElement('div')
    const textTitle = document.createElement('p')
    textTitle.textContent = 'Err'
    const deskripsiText = document.createElement('p')
    deskripsiText.textContent = msg
    cardText.append(textTitle, deskripsiText)
    card.classList.add('card')
    card.append(cardText)
    document.getElementById('belum').innerHTML = ''
    document.getElementById('sudah').innerHTML = ''
    document.getElementById('belum').appendChild(card)
}

function mode() {
    const textMode = document.createElement('div')
    textMode.textContent = modeState
    textMode.setAttribute('id', 'modeInfo')


    const beranda = document.createElement('img')
    beranda.setAttribute('src', 'img/house-solid.svg')
    beranda.setAttribute('title', 'Beranda')
    beranda.addEventListener('click', (e) => {
        textMode.textContent = e.target.title
        modeState = e.target.title
    })

    const twit = document.createElement('img')
    twit.setAttribute('src', 'img/magnifying-glass-solid.svg')
    twit.setAttribute('title', 'Twit')
    twit.addEventListener('click', (e) => {
        textMode.textContent = e.target.title
        modeState = e.target.title
    })

    const log = document.createElement('img')
    log.setAttribute('src', 'img/terminal-solid.svg')
    log.setAttribute('title', 'Log')
    log.addEventListener('click', (e) => {
        textMode.textContent = e.target.title
        modeState = e.target.title
    })

    const modeInfo = document.createElement('div')
    modeInfo.append(textMode)

    const modeBtn = document.createElement('div')
    modeBtn.classList.add('mode-btn')
    modeBtn.append(beranda, twit, log)

    document.getElementById('mode').append(modeInfo, modeBtn)
}