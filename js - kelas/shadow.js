const shadow = document.getElementById('shadow')
const body = document.querySelector('body')
shadow.addEventListener('click', (e) => {
    if (e.target == shadow) hideShadow()
    if (e.target.dataset.option == 'put') console.log('mengedit') + hideShadow()
    if (e.target.dataset.option == 'delete') hideShadow()
})
const showShadow = () => {
    shadow.style.display = 'flex'
    body.style.overflow = 'hidden'
}
showShadow()
const hideShadow = () => {
    shadow.style.display = 'none'
    shadow.style.opacity = '0'
    body.style.overflow = 'auto'
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
        btn.addEventListener('click', async () => {
            await fetch(`${url}/twit/${this.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    nickname: this.nickname
                }),
                headers: {
                    'Content-Type': "application/json"
                }
            }).then(res => res.json()).then(x => {
                formTwitState.isEdit = true
                formTwitState.isTwitId = this.id
                document.getElementById('twit-deskripsi').value = x.isi
                document.getElementById('twit-tag').value = x.tag
                cekTwitState()
                popup(alertMsg.edit)
            })
        })

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
                popup(alertMsg.delete)
                document.dispatchEvent(new Event('renderTugas'))
            })
        })

        option.append(img, text, btn)
        return option
    }
    showOption() {
        shadow.innerHTML = ''
        shadow.append(this.createOptions())
        showShadow()
        setTimeout(() => {
            document.getElementById('more-option').style.transform = 'translateY(0)'
            shadow.style.opacity = '1'
        }, 100)
    }
}


class cardShadow {
    constructor(data) {
        this.tugas = data.tugas
        this.deskripsi = data.deskripsi
        this.id = data.id
        this.tipe = data.tipe
        this.deadline = data.deadline
        this.color = data.color
    }
    createElement() {
        const container = document.createElement('div')
        container.setAttribute('id', 'card-shadow')
        container.append(this.header(), this.body(), this.footer())
        container.style.borderTop = `1em solid ${this.color}`
        return container
    }
    header() {
        const header = document.createElement('div')
        header.style.borderBottom = `.1em solid ${this.color}`

        const title = document.createElement('p')
        title.classList.add('shadow-title')
        title.innerHTML = this.tugas

        header.append(title)
        return header
    }
    body() {
        const body = document.createElement('pre')
        body.innerHTML = this.deskripsi.replace(regex, x => `<a href="${x}" target="_blank">${x}</a>`)
        return body
    }
    footer() {
        const footer = document.createElement('div')
        footer.classList.add('shadow-footer')

        const before = document.createElement('p')
        before.classList.add('shadow-attribute')
        before.textContent = `${this.tipe} ${this.deadline}`

        const after = document.createElement('p')
        after.classList.add('shadow-attribute')
        after.textContent = this.id

        footer.append(before, after)
        return footer
    }
    showCard() {
        shadow.innerHTML = ''
        shadow.append(this.createElement())
        showShadow()
        setTimeout(() => {
            document.getElementById('card-shadow').style.transform = 'translateY(0)'
            shadow.style.opacity = '1'
        }, 100)
    }
}