const shadow = document.getElementById('shadow')
const moreOption = document.getElementById('more-option')
shadow.addEventListener('click', (e) => {
    if (e.target == shadow) hideShadow()
    if (e.target.dataset.option == 'put') console.log('mengedit') + hideShadow()
    if (e.target.dataset.option == 'delete') hideShadow()
})
const showShadow = () => {
    shadow.style.display = 'flex'
}
const hideShadow = () => {
    shadow.style.display = 'none'
}
class twitShadow {
    constructor(id, nickname) {
        this.id = id
        this.nickname = nickname
    }
    createOptions() {
        const container = document.createElement('div')
        container.setAttribute('id', 'more-option')
        container.dataset.id = this.id
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
        btn.addEventListener('click', async () => {
            await fetch(`${url}/twit`, {
                method: 'DELETE',
                body: JSON.stringify({
                    id: this.id,
                }),
                headers: {
                    'Content-Type': "application/json"
                }
            }).then(hideShadow()).then(() => {
                document.getElementById(this.id).style.display = 'none'
            })
        })

        option.append(img, text, btn)
        return option
    }
    showOption() {
        shadow.innerHTML = ''
        shadow.append(this.createOptions())
        showShadow()
    }
}