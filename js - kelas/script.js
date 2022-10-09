const url = 'https://x6todo.herokuapp.com/x6'
const urlLocal = 'http://localhost:3000/x6'
const regex = /(https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g


let link = {
    Beranda: '/',
    Twit: '/twit',
    Log: '/log'
}

let modeState = 'Twit'

const akun = JSON.parse(localStorage.getItem('akun'))
const {nickname, rank: title, pass: token} = akun

// window on load
window.addEventListener('load', () => {
    loaderCard()
    document.dispatchEvent(new Event('renderTugas'))
    minimize()
    greet()
    getDate()
    getProfile()
    roles()
    mode()
    modeNav()
})
document.getElementById('reload').addEventListener('click', () => {
    document.dispatchEvent(new Event('renderTugas'))
})

// render Element
document.addEventListener('renderTugas', () => {
    if (modeState == 'Twit') {
        document.getElementById('trivia').style.display = 'none'
        document.getElementById('mode').style.marginTop = 0
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
    } else if (modeState == 'Log') {
        document.getElementById('trivia').style.display = 'none'
        document.getElementById('belum').innerHTML = 'Comming Soon...'
        document.getElementById('sudah').innerHTML = ''
        document.getElementById('mode').style.marginTop = 0
    } else {
        document.getElementById('trivia').style.display = 'flex'
        document.getElementById('mode').style.marginTop = '1.5em'
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
    if (tasks.length === 0) {
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
    },
    feather: {
        link: 'img/feather-light-solid.svg',
        bgColor: '#1d9bf0'
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

function getProfile() {
    let akun = JSON.parse(localStorage.getItem('akun'))
    document.getElementById('nama').textContent = akun.nickname
    document.getElementById('rank').textContent = akun.rank
    document.getElementById('pp').src = akun.picture
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
        modeNav()
        loaderCard()
        document.dispatchEvent(new Event('renderTugas'))
    })

    const twit = document.createElement('img')
    twit.setAttribute('src', 'img/feather-solid.svg')
    twit.setAttribute('title', 'Twit')
    twit.addEventListener('click', (e) => {
        textMode.textContent = e.target.title
        modeState = e.target.title
        modeNav()
        loaderCard()
        document.dispatchEvent(new Event('renderTugas'))
    })

    const log = document.createElement('img')
    log.setAttribute('src', 'img/terminal-solid.svg')
    log.setAttribute('title', 'Log')
    log.addEventListener('click', (e) => {
        textMode.textContent = e.target.title
        modeState = e.target.title
        modeNav()
        loaderCard()
        document.dispatchEvent(new Event('renderTugas'))
    })

    const modeInfo = document.createElement('div')
    modeInfo.append(textMode)

    const modeBtn = document.createElement('div')
    modeBtn.classList.add('mode-btn')
    modeBtn.append(beranda, twit, log)

    document.getElementById('mode').append(modeInfo, modeBtn)
}

function modeNav() {
    if (modeState == 'Beranda') {
        document.getElementById('header').style.display = 'inherit'
        document.getElementById('proggress').style.display = 'inherit'
        document.getElementById('TwitForm').style.display = 'none'
    } else if (modeState == 'Twit') {
        document.getElementById('header').style.display = 'none'
        document.getElementById('proggress').style.display = 'none'
        new formTwit(akun).showFormTwit()
        document.getElementById('TwitForm').style.display = 'inherit'
    } else {
        document.getElementById('TwitForm').style.display = 'none'
        document.getElementById('header').style.display = 'none'
        document.getElementById('proggress').style.display = 'none'
    }
    document.getElementById('todoapp').style.marginTop = document.getElementById('header').offsetHeight + 'px'
}

function loaderCard() {
    document.getElementById('sudah').innerHTML = ''
    document.getElementById('belum').innerHTML = '<div class="card card-loading card-dark"></div><div class="card card-loading card-dark"></div><div class="card card-loading card-light"></div>'
}