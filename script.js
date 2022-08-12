let tugas = []
const myChache = 'todolist'


// window on load
window.addEventListener('load', () => {
    ambilProggress()
    document.dispatchEvent(new Event('renderTugas'))
    document.getElementById('loader').style.display = 'none'
    minimize()
})

// render Element
document.addEventListener('renderTugas', () => {
    document.getElementById('belum').innerHTML = ''
    document.getElementById('sudah').innerHTML = ''
    tugas.map(x => buatElement(x))
    simpanProggress()
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
            result += `[${x.tugas}\n${x.mulai} | ${x.berakhir}\n${x.deskripsi}]\n\n`
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

// quote with fetch
// const indexQuote = Math.floor(Math.random()*1643)
// fetch("https://type.fit/api/quotes")
// .then(res => res.json())
// .then(x => {
//     document.getElementById('quote').innerText = `"${x[indexQuote].text}"`
//     document.getElementById('author').innerText = '- '+x[indexQuote].author
// })

fetch("https://jservice.io/api/random")
.then(res => res.json())
.then(x => {
    document.getElementById('quote').innerHTML = x[0].question
    document.getElementById('author').innerHTML = `Level ${x[0].value}`
    document.getElementById('author').addEventListener('click', () => document.getElementById('author').innerHTML = x[0].answer)
})

// styling
// make footer marginBottom = height nav
document.getElementById('footer').style.marginBottom = (document.getElementById('nav').offsetHeight + 15) + 'px'

// form state
let formState = {
    normalSize : document.getElementById('form').offsetHeight,
    isMinimize: true
}
function minimize() {
    if (formState.isMinimize) {
        document.getElementById('form').style.height = '4em'
        formState.isMinimize = false
        document.getElementById('minimize').style.transform = 'rotate(0deg)'
    } else {
        document.getElementById('form').style.height = formState.normalSize + 'px'
        formState.isMinimize = true
        document.getElementById('minimize').style.transform = 'rotate(180deg)'
    }
}
document.getElementById('minimize').addEventListener('click', minimize) 