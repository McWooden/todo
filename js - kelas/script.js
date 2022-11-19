const url = 'https://x6todo.herokuapp.com/x6'
const urlLocal = 'http://localhost:3000/x6'
const urlImage = 'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/tugas/'
const regex = /(https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g
const regexDomain = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b/g

let link = {
    Beranda: '/',
    Twit: '/twit',
    Profile: '/profile',
    Log: '/log'
}
let modeState = 'Beranda'
const defaultAccount = {
    name: "anonymous",
    nickname: "User",
    password: "0",
    picture: "https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png",
    rank: "Guest",
    sub: "123456789"
}
const defaultAuth = {
    nickname: 'Guest',
    password: 'Guest'
}
const akun = JSON.parse(localStorage.getItem('akun')) || defaultAccount
const {nickname, rank: title, pass: token} = akun
// window on load
window.addEventListener('load', () => {
    loaderCard()
    document.dispatchEvent(new Event('renderTugas'))
    minimize()
    greet()
    getDate()
    roles()
    mode()
    modeNav()
    changeTheme()
    document.body.style.marginBottom = document.querySelector('nav').offsetHeight + 'px'
})
document.getElementById('reload').addEventListener('click', () => {
    document.dispatchEvent(new Event('renderTugas'))
})

// render Element
document.addEventListener('renderTugas', () => {
    document.querySelector('#rotate-right-solid').classList.add('spin')
    hideLoginForm()
    if (modeState == 'Twit') {
        fetch(`${url}${link.Twit}`)
        .then(res => res.json())
        .then(twits => {
            document.getElementById('belum').innerHTML = ''
            document.getElementById('sudah').innerHTML = ''
            let twit = twits.reverse()
            twit.map(item => new Twit(item).showTwit())
            popup(alertMsg.reload)
        }).catch((err) => {
            showError(err)
        }).finally(() => document.querySelector('#rotate-right-solid').classList.remove('spin'))
    } else if (modeState == 'Profile') {
        document.getElementById('belum').innerHTML = ''
        document.getElementById('sudah').innerHTML = ''
        showLoginForm()
        loginToMyAccount()
        document.querySelector('#rotate-right-solid').classList.remove('spin')
        myAccountDetail()
    } else if (modeState == 'Log') {
        document.getElementById('belum').innerHTML = ''
        document.getElementById('sudah').innerHTML = ''
        jadwalConfig()
        document.querySelector('#rotate-right-solid').classList.remove('spin')
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
        }).finally(() => document.querySelector('#rotate-right-solid').classList.remove('spin'))
    }
})

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
    document.getElementById('tipeTugas').value = 'tugas'
    document.getElementById('color').value = '#31364c'
    greet()
    getDate()
    formState.isEdit = false
    document.getElementById('btnUpdate').style.visibility = 'hidden'
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

function loaderCard() {
    document.getElementById('sudah').innerHTML = ''
    document.getElementById('belum').innerHTML = '<div class="card card-loading card-dark"></div><div class="card card-loading card-dark"></div><div class="card card-loading card-dark"></div><div class="card card-loading card-dark"></div>'
}
