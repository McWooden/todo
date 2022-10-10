class formTwit {
    constructor(akun) {
        this.picture = akun.picture
        this.nickname = akun.nickname
        this.title = akun.rank
        this.formTwit = this.createFormTwit()
        this.token = akun.pass
    }

    createFormTwit() {
        const form = document.createElement('form')
        form.setAttribute('id', 'formTwit')
        form.append(this.formPicture(), this.formContainer())

        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            if (document.getElementById('twit-deskripsi').value == '') {
                document.querySelector('.twitForm-title').textContent = 'Apa yang terjadi!?'
                document.querySelector('.twitForm-title').style.color = '#774360'
                return
            } else {
                document.querySelector('.twitForm-title').textContent = this.title
                document.querySelector('.twitForm-title').style.color = '#71767b'
            }
            const data = {
                picture: this.picture,
                nickname: this.nickname,
                title: this.title,
                isi: document.getElementById('twit-deskripsi').value,
                tag: document.getElementById('twit-tag').value,
                token: this.token,
            }
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }
            await fetch(`${url}${link[modeState]}`, options).then(form.reset())
            document.dispatchEvent(new Event('renderTugas'))
            popup(alertMsg.feather)
        })

        return form
    }

    formPicture() {
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('img-container')

        const picture = document.createElement('img')
        picture.classList.add('pp-form')
        picture.src = this.picture

        imgContainer.append(picture)

        return imgContainer
    }

    formContainer() {
        const container = document.createElement('div')
        container.classList.add('form-container')
        container.append(this.formHeader(), this.formDescription(), this.formTag())

        return container
    }
    formHeader() {
        const formHeader = document.createElement('div')
        formHeader.classList.add('form-header')

        const nickname = document.createElement('p')
        nickname.classList.add('twitForm-nickname')
        nickname.textContent = `${this.nickname}`

        const title = document.createElement('p')
        title.classList.add('twitForm-title')
        title.textContent = `${this.title}`
        
        formHeader.append(nickname, title)
        formHeader.addEventListener('click', () => window.location = 'https://mcwooden.github.io/todo/profile')

        return formHeader
    }

    formDescription() {
        const deskripsiContainer = document.createElement('div')
        deskripsiContainer.classList.add('deskripsi-container')

        const deskripsi = document.createElement('textarea')
        deskripsi.setAttribute('id', 'twit-deskripsi')
        deskripsi.setAttribute('placeholder', 'apa yang sedang terjadi?')

        deskripsiContainer.append(deskripsi)

        return deskripsiContainer
    }

    formTag() {
        const tagAndSubmit = document.createElement('div')
        tagAndSubmit.classList.add('tagAndSubmit')

        const tag = document.createElement('input')
        tag.setAttribute('id', 'twit-tag')
        tag.setAttribute('placeholder', '#tag')
        tag.addEventListener('click', () => {
            if (tag.value == '') {
                tag.value = '#'
            }
        })
        tag.addEventListener('change', () => {
            tag.value = [...tag.value.split(' ')].map(x => x.charAt(0).toUpperCase() + x.slice(1)).join('')
        })

        const submit = document.createElement('button')
        submit.setAttribute('id', 'twitSubmit')
        submit.setAttribute('type', 'submit')
        submit.setAttribute('form', 'formTwit')

        const submitIcon = document.createElement('img')
        submitIcon.setAttribute('src', 'img/feather-light-solid.svg')

        submit.append(submitIcon)

        tagAndSubmit.append(tag, submit)

        return tagAndSubmit
    }

    showFormTwit() {
        document.getElementById('TwitForm').innerHTML = ''
        return document.getElementById('TwitForm').append(this.formTwit)
    }
}