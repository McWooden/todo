if (localStorage.getItem('auth') == null) {
    localStorage.setItem('auth', '')
}
if (localStorage.getItem('akun') == null) {
    localStorage.setItem('akun', JSON.stringify(defaultAccount))
}
const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    loginForm.submitBtn.style.opacity = '.5'
    const data = {
        nickname: loginForm.nickname.value,
        password: loginForm.password.value
    }
    localStorage.setItem('auth', JSON.stringify(data))
    loginForm.submitBtn.style.opacity = '1'
    await loginToMyAccount()
    location.reload()
})
function hideLoginForm() {
    document.querySelector('form#loginForm').style.display = 'none'
}
function showLoginForm() {
    document.querySelector('form#loginForm').style.display = 'flex'
}

async function loginToMyAccount() {
    let auth
    try {
        auth = JSON.parse(localStorage.getItem('auth'))
    } catch (error) {
        auth = defaultAuth
    }
    const data = {
        nickname: auth.nickname,
        password: auth.password
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json',}
    }
    const result = await fetch(`https://x6todo.herokuapp.com/get-my-profile`, options).then(res => res.json())
    localStorage.setItem('akun', JSON.stringify(result))
    return result
}
loginToMyAccount()

async function myAccountDetail() {
    const c = document.createElement('div')
    c.classList.add('container', 'detail-profile')
        const pName = document.createElement('p')
        pName.textContent = 'Nama'
        const pRank = document.createElement('p')
        pRank.textContent = 'Rank'
        const pImg = document.createElement('p')
        pImg.textContent = 'Url Avatar'
            const name = document.createElement('input')
            name.value = akun.name
            name.readOnly = true
            const rank = document.createElement('input')
            rank.value = akun.rank
            rank.readOnly = true
            const image = document.createElement('input')
            image.value = akun.picture
            image.readOnly = true
        const logout = document.createElement('p')
        logout.classList.add('logout-btn')
        logout.textContent = 'logout'
        logout.addEventListener('click', () => {
            new myAlert(() => {
                localStorage.setItem('auth', JSON.stringify(defaultAuth))
                location.reload()
            }, {msg: 'Logout?'}).render()
        })
    c.append(pName, name, pRank, rank, pImg, image, logout)
    document.getElementById('belum').append(c)
}