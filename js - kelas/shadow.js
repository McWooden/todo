const shadow = document.getElementById('shadow')
const moreOption = document.getElementById('more-option')
shadow.addEventListener('click', (e) => {
    if (e.target == shadow) hideShadow()
    if (e.target.dataset.option == 'put') console.log('mengedit') + hideShadow()
    if (e.target.dataset.option == 'delete') console.log('menghapus') + hideShadow()
})
const showShadow = () => {
    shadow.style.display = 'flex'
}
const hideShadow = () => {
    shadow.style.display = 'none'
}
class twitShadow {
    constructor(id) {
        this.id = id
    }
    createOptions() {
        const container = document.createElement('div')
        container.setAttribute('id', 'more-option')
        container.append(this.update(), this.delete())
        return container
    }
    update() {
        const option = document.createElement('div')
        option.classList.add('option')
        const img = document.createElement('img')
        img.classList.add('option-icon')
        img.setAttribute('src', 'img/pen-to-square-solid.svg')
        const text = document.createElement('p')
        text.textContent = 'Edit'
        const btn = document.createElement('div')
        btn.classList.add('option-btn')
        btn.dataset.option = 'put'

        option.append(img, text, btn)
        return option
    }
    delete() {
        const option = document.createElement('div')
        option.classList.add('option')
        const img = document.createElement('img')
        img.classList.add('option-icon')
        img.setAttribute('src', 'img/trash-solid-white.svg')
        const text = document.createElement('p')
        text.textContent = 'Delete'
        const btn = document.createElement('div')
        btn.classList.add('option-btn')
        btn.dataset.option = 'delete'

        option.append(img, text, btn)
        return option
    }
    showOption() {
        shadow.innerHTML = ''
        shadow.append(this.createOptions())
        showShadow()
    }
}