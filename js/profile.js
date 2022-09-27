// account secure stonk 100% :)
const defaultAccount = {
    nickname: 'User',
    title: 'Guest',
    pass: '0'
}
if (localStorage.getItem('akun') == null) {
    localStorage.setItem('akun', JSON.stringify({}))
}
async function addAccountStorage() {
    await fetch('https://x6todo.herokuapp.com/x6/title', {
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