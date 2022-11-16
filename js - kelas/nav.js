async function mode() {
    const modeInfo = document.createElement('div')
    modeInfo.setAttribute('title', 'Profile')
    modeInfo.classList.add('profile')
        const profile = document.createElement('img')
        profile.setAttribute('src', akun.picture)
        profile.setAttribute('id', 'pp')
        const nickname = document.createElement('span')
        nickname.setAttribute('id', 'nickname')
        nickname.textContent = akun.nickname
    modeInfo.append(profile, nickname)
    modeInfo.addEventListener('click', () => clickModeNavElement('Profile'))

    const beranda = document.createElement('img')
    beranda.setAttribute('src', 'img/house-solid.svg')
    beranda.setAttribute('title', 'Beranda')
    beranda.addEventListener('click', () => clickModeNavElement('Beranda'))

    const twit = document.createElement('img')
    twit.setAttribute('src', 'img/feather-solid.svg')
    twit.setAttribute('title', 'Twit')
    twit.addEventListener('click', () => clickModeNavElement('Twit'))

    const log = document.createElement('img')
    log.setAttribute('src', 'img/terminal-solid.svg')
    log.setAttribute('title', 'Log')
    log.addEventListener('click', () => clickModeNavElement('Log'))

    const modeBtn = document.createElement('div')
    modeBtn.classList.add('mode-btn')
    modeBtn.append(beranda, twit, log)
    document.getElementById('mode').append(modeInfo, modeBtn)
}
function clickModeNavElement(newState) {
    modeState = newState
    modeNav()
    loaderCard()
    document.dispatchEvent(new Event('renderTugas'))
    changeTheme()
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

function changeTheme() {
    const mode = document.getElementById('mode')
    const white = '#f0f1f3'
    const black = '#0A0D14'
    const lowBlack = '#1b1e2b'
    const body = document.querySelector('body')
    if (modeState == 'Twit') {
        body.style.backgroundColor = black
        mode.style.backgroundColor = black
    } else if (modeState == 'Profile') {
        body.style.backgroundColor = lowBlack
        mode.style.backgroundColor = lowBlack
    } else {
        body.style.backgroundColor = white
        mode.style.backgroundColor = '#2b2f42'
    }
}

const filterBtn = document.querySelectorAll('.filter-btn')
filterBtn.forEach(element => {
    element.addEventListener('click', (e) => {
        filterTugas(e.target.dataset.filter)
        e.target.classList.toggle('disable')
    })
})
let filterTugasState = {
    tugas: true,
    ulangan: true,
    kelompok: true
}
function resetFilterTugas() {
    filterTugasState.tugas = true
    filterTugasState.ulangan = true
    filterTugasState.kelompok = true
}
function filterTugas(filter) {
    filterTugasState[filter] = !filterTugasState[filter]
    filterMode()
}
function filterMode() {
    const card = document.querySelectorAll('.card')
    card.forEach(x => {
        if (filterTugasState[x.dataset.filter]) {
            x.style.display = 'flex'
        } else {
            x.style.display = 'none'
        }
    })
}