const shadow = document.getElementById('shadow')
const body = document.querySelector('body')
shadow.addEventListener('click', (e) => {
    if (e.target == shadow) hideShadow()
    if (e.target.dataset.option == 'put') hideShadow()
})
const showShadow = () => {
    shadow.style.display = 'flex'
    body.style.overflow = 'hidden'
}
// showShadow()
const hideShadow = () => {
    shadow.style.opacity = '0'
    body.style.overflow = 'auto'
    setTimeout(() => {
        shadow.style.display = 'none'
    }, 200)
}


class addImage {
    constructor(id, tugas, nickname) {
        this.id = id
        this.tugas = tugas
        this.nickname = nickname
    }
    createForm() {
        const form = document.createElement('form')
        form.setAttribute('id', 'form-add-file')
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            const data = new FormData()
            data.append('image', input.files[0])
            data.append('id', this.id)
            data.append('tugas', this.tugas)
            data.append('nickname', this.nickname)

            const options = {
                method: 'POST',
                body: data,
            }

            await fetch(`${url}/image`, options).then(() => {
                hideShadow()
                document.dispatchEvent(new Event('renderTugas'))
                popup(alertMsg.save)
            })
        })

            const p = document.createElement('p')
            p.textContent = this.tugas + ' - ' + this.id

            const input = document.createElement('input')
            input.type = 'file'
            input.id = 'inputFile'
            input.required = true

            const submit = document.createElement('input')
            submit.type = 'submit'
            submit.value = 'kirim'

            form.append(p, input, submit)
        return form
    }
    render() {
        shadow.innerHTML = ''
        shadow.append(this.createForm())
        setTimeout(() => {
            document.querySelector('#form-add-file').style.transform = 'translateX(0)'
        }, 100)
    }
}

class imgShadow {
    constructor (id, path) {
        this.id = id
        this.path = path
    }
    createElement() {
        const c = document.createElement('div')
        c.setAttribute('id', 'more-option')
        c.dataset.id = this.id
        c.append(this.delete())
        return c
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
        btn.addEventListener('click', () => {
            if (title != 'Owner' && title != 'Admin') {
                return new myAlert(hideShadow, {msg: `kamu bukan admin`}).showAlert()
            }
            new myAlert(async () => {
                await fetch(`${url}/image`, {
                    method: 'DELETE',
                    body: JSON.stringify({
                        id: this.id,
                        path: this.path
                    }),
                    headers: {
                        'Content-Type': "application/json"
                    }
                }).then(() => {
                    hideShadow()
                    popup(alertMsg.delete)
                    document.dispatchEvent(new Event('renderTugas'))
                })
            }, {msg: `Menghapus gambar:<br><span style="opacity: .5; font-size: .6em;">${this.path}</span><br>apa kamu yakin?`}).showAlert()
        })

        option.append(img, text, btn)
        return option
    }
    show() {
        shadow.innerHTML = ''
        shadow.append(this.createElement())
        setTimeout(() => {
            document.querySelector('#more-option').style.transform = 'translateX(0)'
        }, 100)
    }
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
        btn.addEventListener('click', () => {
            new myAlert(async () => {
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
            }, {msg: 'apa kamu yakin?'}).showAlert()
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
        this.selesaiCount = data.selesaiCount
        this.selesai = data.selesai
        this.images = data.images
    }
    createElement() {
        const container = document.createElement('div')
        container.setAttribute('id', 'card-shadow')
        container.append(this.header(), this.storage(), this.body(), this.footer())
        container.style.borderTop = `1em solid ${this.color}`
        return container
    }
    header() {
        const header = document.createElement('div')
        header.style.borderBottom = `.1em solid ${this.color}`
        header.classList.add('shadow-header')

        const title = document.createElement('p')
        title.classList.add('shadow-title')
        title.innerHTML = this.tugas

        header.append(title, this.badge())
        return header
    }
    storage() {
        const c = document.createElement('div')
        c.classList.add('shadow-storage')
        const add = document.createElement('div')
        add.textContent = '+'
        add.classList.add('storage-item', 'add-item')
        add.addEventListener('click', () => {
            new addImage(this.id, this.tugas, nickname).render()
        })

        try {
            this.images.map(x => {
                const img = document.createElement('img')
                img.classList.add('storage-item')
                img.setAttribute('src', `${urlImage + x}`)
                img.addEventListener('click', () => {
                    new imgShadow(this.id, x).show()
                })
                c.append(img)
            })
        } catch (err) {

        }
        if (title == 'Owner' || title == 'Admin') {
            c.append(add)
        }
        return c
    }
    badge() {
        const div = document.createElement('div')
        div.classList.add('badge')

        const tanda = document.createElement('div')
        const img = document.createElement('img')
        const text = document.createElement('span')

        try {
            if (!this.selesaiCount.includes(nickname)) {
                tanda.classList.add('shadow-tanda', 'shadow-tanda-belum')
                tanda.addEventListener('click', () => this.addSelesai())
                    img.src = 'img/check-solid.svg'
                    text.textContent = 'tandai tugas'
            } else {
                tanda.classList.add('shadow-tanda', 'shadow-tanda-selesai')
                tanda.addEventListener('click', () => this.deleteSelesai())
                    img.src = 'img/reply-solid.svg'
                    text.textContent = 'tunda tugas'
            }
        } catch (err) {
            tanda.classList.add('shadow-tanda', 'shadow-tanda-belum')
                tanda.addEventListener('click', () => this.addSelesai())
                    img.src = 'img/check-solid.svg'
                    text.textContent = 'tandai tugas'
        }
        tanda.append(img, text)
            
        const selesai = document.createElement('span')
        try {
            selesai.textContent = `${this.selesaiCount.length} selesai`
        } catch (err) {
            selesai.textContent = `Belum ada yang selesai`
        }
        selesai.classList.add('sudah-selesai')

        div.append(tanda, selesai)
        return div
    }
    async addSelesai() {
        await fetch(`${url}/addSelesai`, {
            method: "PUT",
            body: JSON.stringify({id: this.id, nickname}),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(popup(alertMsg.save)).then(() => {
            hideShadow()
            document.dispatchEvent(new Event('renderTugas'))
        })
    }
    async deleteSelesai() {
        await fetch(`${url}/deleteSelesai`, {
            method: "PUT",
            body: JSON.stringify({id: this.id, nickname}),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(popup(alertMsg.save)).then(() => {
            hideShadow()
            document.dispatchEvent(new Event('renderTugas'))
        })
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
        after.style.color = this.color

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
        isi.innerHTML = this.isi.replace(regex, x => `<a href="${x}" target="_blank">${x}</a>`)

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
            cardComment.id = x._id
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
                trash.addEventListener('click', () => {
                    new myAlert(async() => {
                        await fetch(`${url}/twit/deleteComment`, {
                            method: "PUT",
                            body: JSON.stringify({id: this.id, commentId: x._id}),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }).then(() => {
                            popup(alertMsg.delete)
                            document.dispatchEvent(new Event('renderTugas'))
                        })
                    }, {msg: 'apa kamu yakin?'}).showAlert()
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

class myAlert {
    constructor(callback, data) {
        this.msg = data.msg
        this.callback = callback
    }
    alertBody() {
        const container = document.createElement('div')
        container.classList.add('my-alert')

        const msg = document.createElement('p')
        msg.innerHTML = this.msg

        container.append(msg, this.alertBtn())
        return container
    }
    alertBtn() {
        const btn = document.createElement('div')
        btn.classList.add('alert-footer')

        const ya = document.createElement('span')
        ya.textContent = 'ya'
        ya.style.color = '#267abf'
        ya.addEventListener('click', () => {
            hideShadow()
            this.callback() 
        })

        const batal = document.createElement('span')
        batal.textContent = 'batal'
        batal.style.color = '#a51357'
        batal.addEventListener('click', () => hideShadow())

        btn.append(batal, ya)
        return btn
    }
    showAlert() {
        shadow.innerHTML = ''
        shadow.append(this.alertBody())
        showShadow()
        setTimeout(() => {
            shadow.style.opacity = '1'
            document.querySelector('.my-alert').style.transform = 'translateX(0)'
        }, 100)
    }
}