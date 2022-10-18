function mode() {
    const profile = document.createElement('img')
    profile.setAttribute('src', akun.picture)
    profile.setAttribute('id', 'pp')
    profile.addEventListener('click', () => {
        window.location = 'https://mcwooden.github.io/todo/profile'
    })
    const nickname = document.createElement('span')
    nickname.setAttribute('id', 'nickname')
    nickname.textContent = akun.nickname

    const beranda = document.createElement('img')
    beranda.setAttribute('src', 'img/house-solid.svg')
    beranda.setAttribute('title', 'Beranda')
    beranda.addEventListener('click', (e) => {
        modeState = e.target.title
        modeNav()
        loaderCard()
        document.dispatchEvent(new Event('renderTugas'))
    })

    const twit = document.createElement('img')
    twit.setAttribute('src', 'img/feather-solid.svg')
    twit.setAttribute('title', 'Twit')
    twit.addEventListener('click', (e) => {
        modeState = e.target.title
        modeNav()
        loaderCard()
        document.dispatchEvent(new Event('renderTugas'))
    })

    const log = document.createElement('img')
    log.setAttribute('src', 'img/terminal-solid.svg')
    log.setAttribute('title', 'Log')
    log.addEventListener('click', (e) => {
        modeState = e.target.title
        modeNav()
        loaderCard()
        document.dispatchEvent(new Event('renderTugas'))
    })

    const modeInfo = document.createElement('div')
    modeInfo.classList.add('profile')
    modeInfo.append(profile, nickname)
    modeInfo.addEventListener('click', () => {
        window.location = 'https://mcwooden.github.io/todo/profile'
    })

    const modeBtn = document.createElement('div')
    modeBtn.classList.add('mode-btn')
    modeBtn.addEventListener('click', () => changeTheme())
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
const filterBtn = document.querySelectorAll('.filter-btn')
filterBtn.forEach(element => {
    element.addEventListener('click', (e) => {
        filterTugas(e.target.dataset.filter)
    })
})
let filterTugasSatate = {
    tugas: true,
    ulangan: true,
    kelompok: true
}
function resetFilterTugas() {
    filterTugasSatate.tugas = true
    filterTugasSatate.ulangan = true
    filterTugasSatate.kelompok = true
}
function filterTugas(filter) {
    return filterTugasSatate[filter] = !filterTugasSatate[filter]
}