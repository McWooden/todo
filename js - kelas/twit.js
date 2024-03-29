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
        form.append(this.formContainer())

        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            if (document.getElementById('twit-deskripsi').value == '') {
                return
            }
            if (!formTwitState.isEdit) {
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
            } else {
                saveEditTwit(formTwitState.isTwitId)
            }
        })

        return form
    }

    formContainer() {
        const container = document.createElement('div')
        container.classList.add('form-container')
        container.append(this.formDescription(), this.formTag())

        return container
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

        // submit
        const submit = document.createElement('button')
        submit.setAttribute('id', 'twitSubmit')
        submit.setAttribute('type', 'submit')
        submit.setAttribute('form', 'formTwit')
        const submitIcon = document.createElement('img')
        submitIcon.setAttribute('src', 'img/feather-light-solid.svg')
        submit.append(submitIcon)
        // save
        const save = document.createElement('button')
        submit.setAttribute('type', 'submit')
        save.setAttribute('id', 'twitSave')
        save.setAttribute('form', 'formTwit')
        const saveIcon = document.createElement('img')
        saveIcon.setAttribute('src', 'img/floppy-disk-solid.svg')
        save.append(saveIcon)
        
        tagAndSubmit.append(tag, submit, save)

        return tagAndSubmit
    }

    showFormTwit() {
        document.getElementById('TwitForm').innerHTML = ''
        return document.getElementById('TwitForm').append(this.formTwit)
    }
}

async function saveEditTwit(id) {
    await fetch(`${url}/twit`, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            isi: document.getElementById('twit-deskripsi').value,
            tag: document.getElementById('twit-tag').value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    document.dispatchEvent(new Event('renderTugas'))
    formTwitState.isEdit = false
    formTwitState.isTwitId = 0
    cekTwitState()
    document.getElementById('twit-deskripsi').value = ''
    document.getElementById('twit-tag').value = ''
    popup(alertMsg.save)
}

let formTwitState = {
    isEdit: false,
    isTwitId: 0
}
function cekTwitState() {
    const twitSubmit = document.getElementById('twitSubmit')
    const twitSave = document.getElementById('twitSave')
    twitSubmit.style.display = 'none'
    twitSave.style.display = 'none'
    if (!formTwitState.isEdit) {
        twitSubmit.style.display = 'inherit' 
    } else {
        twitSave.style.display = 'inherit'
    }
}