if (localStorage.getItem(myChache) == null) {
    localStorage.setItem(myChache, '')
}
function simpanProggress() {
    let simpanJSON = JSON.stringify(tugas)
    localStorage.setItem(myChache, simpanJSON)
}
function ambilProggress() {
    let ambilJSON = JSON.parse(localStorage.getItem(myChache))
    tugas = ambilJSON
}

// account secure stonk 100% :)
if (localStorage.getItem('akun') == null) {
    localStorage.setItem('akun', '')
}
function addAccountStorage() {
    const account = {
        nickname: document.getElementById('nickname').value,
        title: document.getElementById('title').value,
        pass: document.getElementById('pass').value
    }
    localStorage.setItem('akun', JSON.stringify(account))
    console.log(account, JSON.stringify(account))
    refresh()
}