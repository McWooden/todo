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










class commentTwit {
    constructor(data) {
        this.id = data.id
        this.nickname = data.nickname
        this.isi = data.isi
        this.date = data.date
        this.comment = data.comment
    }
    createElement() {
        const container = document.createElement('div')
        container.setAttribute('id', 'twit-shadow')
        container.append(this.header(), this.body(), this.footer())
        return container
    }
    header() {
        const title = document.createElement('span')
        title.classList.add('twit-shadow-title')
        title.textContent = this.nickname + ' '

        const isi = document.createElement('span')
        isi.classList.add('twit-shadow-isi')
        isi.textContent = this.isi

        const attr = document.createElement('div')
            const tag = document.createElement('span')
            tag.classList.add('twit-shadow-attr', 'attr-blue')
            tag.textContent = this.tag

            const date = document.createElement('span')
            date.classList.add('twit-shadow-attr')
            date.textContent = this.date
        attr.append(tag, date)
        

        const header = document.createElement('div')
        header.classList.add('twit-shadow-header')
        header.append(title, isi, attr)
        return header
    }
    body() {
        const body = document.createElement('div')
        body.classList.add('twit-shadow-body')

        this.comment.map(x => {
            const cardComment = document.createElement('div')
            cardComment.classList.add('twit-comment')
            cardComment.addEventListener('click', (e) => {
                if (e.target == divContent) return
                if (x.commentNickname == nickname) {
                    trash.classList.toggle('hide-comment-trash')
                    cardComment.classList.toggle('comment-highlight')
                }
            })
                const trash = document.createElement('img')
                trash.setAttribute('src', 'img/trash-solid-white.svg')
                trash.classList.add('hide-comment-trash', 'comment-trash')
                trash.addEventListener('click', async () => {
                    await fetch(`${url}/twit/deleteComment`, {
                        method: "PUT",
                        body: JSON.stringify({id: this.id, commentId: x._id}),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then(() => {
                        document.querySelector('#twit-shadow').style.transform = 'translateX(100%)'
                        popup(alertMsg.delete)
                        document.dispatchEvent(new Event('renderTugas'))
                        setTimeout(() => {
                            hideShadow()
                        }, 300);
                    })
                })

                const divContent = document.createElement('div')
                divContent.classList.add('twit-comment-content')
                    const title = document.createElement('span')
                    title.classList.add('twit-comment-title')
                    title.textContent = x.commentNickname + ' '
                    const isi = document.createElement('span')
                    isi.classList.add('twit-comment-isi')
                    isi.textContent = x.commentBody
                divContent.append(title, isi)

            cardComment.append(divContent, trash)
            body.append(cardComment)
        })

        return body
    } 
    footer() {
        const footer = document.createElement('form')
        footer.addEventListener('submit', async (e) => {
            e.preventDefault()
            await fetch(`${url}/twit/addComment`, {
                method: "PUT",
                body: JSON.stringify({
                    id: this.id,
                    commentNickname: nickname,
                    commentBody: input.value
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(() => {
                document.querySelector('#twit-shadow').style.transform = 'translateX(100%)'
                document.dispatchEvent(new Event('renderTugas'))
                input.value = ''
                popup(alertMsg.save)
                setTimeout(() => {
                    hideShadow()
                }, 300);
            })
        })
        footer.setAttribute('id', 'twit-comment-form')
            const input = document.createElement('input')
            input.setAttribute('type', 'text')
            input.setAttribute('placeholder', `berkomentar sebagai ${nickname}`)
            input.classList.add('twit-tag')
            const btn = document.createElement('button')
            btn.setAttribute('type', 'submit')
            btn.setAttribute('form', 'twit-comment-form')
                const btnIcon = document.createElement('img')
                btnIcon.setAttribute('src', 'img/feather-light-solid.svg')
            btn.append(btnIcon)
        footer.append(input, btn)
        return footer
    }

    showComment() {
        shadow.innerHTML = ''
        shadow.append(this.createElement())
        showShadow()
        setTimeout(() => {
            shadow.style.opacity = '1'
            document.getElementById('twit-shadow').style.transform = 'translateX(0)'
        }, 100)
    }
}