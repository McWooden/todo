if (localStorage.getItem('costumCss') == null) {
    localStorage.setItem('costumCss', '')
}
function addCssCostumStorage(value) {
    localStorage.setItem('costumCss', value)
}
function logState() {
    const sudah = document.getElementById('sudah')
    
    const container = document.createElement('div')
    container.classList.add('costum-css-container')
    container.innerHTML = 'hello world!'

    const input = document.createElement('textarea')
    input.innerHTML = localStorage.getItem('costumCss')
    input.classList.add('costum-css-input')

    const btn = document.createElement('p')
    btn.classList.add('constum-css-btn')
    btn.innerHTML = '> submit' 
    btn.addEventListener('click', () => {
        addCssCostumStorage(input.value)
        costumCss()
    })

    const btnDel = document.createElement('p')
    btnDel.classList.add('constum-css-btn')
    btnDel.innerHTML = '> delete' 
    btnDel.addEventListener('click', () => {
        addCssCostumStorage('')
        costumCss()
        input.value = ''
    })


    container.append(input, btn, btnDel)
    sudah.append(container)
}

function costumCss() {
    document.getElementById('costumCss').innerHTML = localStorage.getItem('costumCss')
}