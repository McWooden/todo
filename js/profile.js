// account secure stonk 100% :)
const defaultAccount = {
    name: "anonymous",
    nickname: "User",
    password: "0",
    picture: "img/no-pic.png",
    rank: "Guest",
    sub: "123456789"
}
if (localStorage.getItem('akun') == null) {
    localStorage.setItem('akun', JSON.stringify(defaultAccount))
}
async function addAccountStorage(object) {
    localStorage.setItem('akun', object)
    getProfile()
}
function deleteAccountStorage() {
    localStorage.setItem('akun',JSON.stringify(defaultAccount))
    getProfile()
}