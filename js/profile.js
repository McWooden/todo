// account secure stonk 100% :)
const defaultAccount = {
    nickname: '',
    title: '',
    pass: ''
}
if (localStorage.getItem('akun') == null) {
    localStorage.setItem('akun', JSON.stringify(defaultAccount))
}
function addAccountStorage() {
    const account = {
        nickname: document.getElementById('nickname').value,
        title: document.getElementById('title').value,
        pass: document.getElementById('pass').value
    }
    localStorage.setItem('akun', JSON.stringify(account))
    refresh()
}
function deleteAccountStorage() {
    localStorage.setItem('akun',JSON.stringify(defaultAccount))
    refresh()
}