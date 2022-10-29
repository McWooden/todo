let formState = {
    isMinimize: true,
    isEdit: false,
}

const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {    
    e.preventDefault()
    const data = {
        tugas: document.getElementById('tugas').value,
        deskripsi: document.getElementById('deskripsi').value,
        color: document.getElementById('color').value,
        mulai: document.getElementById('mulai').value,
        tipe: document.getElementById('tipeTugas').value,
        by: nickname,
        rank: title,
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
            tipe: document.getElementById('tipeTugas').value,
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

document.getElementById('minimize').addEventListener('click', minimize) 
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