let tugas = []
const myChache = 'todolist'


// window on load
window.addEventListener('load', () => {
    ambilProggress()
    document.dispatchEvent(new Event('renderTugas'))
    document.getElementById('loader').style.display = 'none'
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
fetch('https://dummyjson.com/quotes/random')
.then(res => res.json())
.then(x => {
    document.getElementById('quote').innerText = `"${x.quote}"`
    document.getElementById('author').innerText = '- '+x.author
})

// make footer marginBottom = height nav
document.getElementById('footer').style.marginBottom = (document.getElementById('nav').offsetHeight + 15) + 'px'