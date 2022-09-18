// account secure stonk 100% :)
const defaultAccount = {
    nickname: '',
    title: '',
    pass: ''
}
if (localStorage.getItem('akun') == null) {
    localStorage.setItem('akun', JSON.stringify(defaultAccount))
}
async function addAccountStorage() {
    await fetch('https://x6todo.herokuapp.com/x6/getTitle', {
        method: "PUT",
        body: JSON.stringify({pass: document.getElementById('pass').value}),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(x => x.json()).then(x => {
        const account = {
            nickname: document.getElementById('nickname').value,
            title: x.title,
            pass: document.getElementById('pass').value
        }
        localStorage.setItem('akun', JSON.stringify(account))
    })
    refresh()
}
function deleteAccountStorage() {
    localStorage.setItem('akun',JSON.stringify(defaultAccount))
    refresh()
}