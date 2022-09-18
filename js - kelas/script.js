// window on load
window.addEventListener('load', () => {
    document.dispatchEvent(new Event('renderTugas'))
    minimize()
    greet()
    getDate()
    refresh()
    roles()
})
document.getElementById('reload').addEventListener('click', () => {
    document.dispatchEvent(new Event('renderTugas'))
})

// render Element
document.addEventListener('renderTugas', () => {
    fetch('https://x6todo.herokuapp.com/x6')
    .then(res => res.json())
    .then(tasks => {
        document.getElementById('belum').innerHTML = ''
        document.getElementById('sudah').innerHTML = ''
        let tugas = tasks
        tugas.map((item, index) => buatElement(item, index))
        popup(alertMsg.reload)
        updateProggress(tasks)
    })
})

//  form on submit
const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {    
    e.preventDefault()
    const akun = JSON.parse(localStorage.getItem('akun'))
    const data = {
        tugas: document.getElementById('tugas').value,
        deskripsi: document.getElementById('deskripsi').value,
        color: document.getElementById('color').value,
        mulai: document.getElementById('mulai').value,
        berakhir: document.getElementById('tanggal').value,
        by: akun.nickname,
        token: akun.pass,
        selesai: false
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    await fetch('https://x6todo.herokuapp.com/x6', options).then(form.reset())

    document.dispatchEvent(new Event('renderTugas'))
    rotateSubmitButton()
    popup(alertMsg.add)
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
document.getElementById('trivia').style.display = 'block'
document.getElementById('header').style.top = 'auto'
document.getElementById('footer').style.marginBottom = (document.getElementById('nav').offsetHeight + 15) + 'px'

// form state
let formState = {
    isMinimize: true,
    isEdit: false,
}
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
        bgColor: '#A27B5C'
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
    if (title != 'Owner' || title != 'Admin') {
        document.getElementById('buttonToSubmit').style.opacity = '.5'
        form.style.opacity = '.5'
    }
}