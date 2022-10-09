class Twit {
    constructor(data) {
        this.picture = data.picture
        this.nickname = data.nickname
        this.title = data.title
        this.isi = data.isi
        this.tag = data.tag
        this.date = data.date
        this.time = data.time
        this.color = data.color
        this.token = data.token
        this.twit = this.createTwitElement()
    }

    createTwitElement() {
        const twit = document.createElement('div')
        twit.classList.add('twit')
        twit.append(this.formPicture(), this.formContainer())
        return twit
    }

    formPicture() {
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('twit-img')

        const picture = document.createElement('img')
        picture.classList.add('user-img')
        picture.src = this.picture

        imgContainer.append(picture)

        return imgContainer
    }

    formContainer() {
        const container = document.createElement('div')
        container.classList.add('twit-container')
        container.append(this.twitHeader(), this.twitBody())

        return container
    }
    
    twitHeader() {
        const twitHeader = document.createElement('div')
        twitHeader.classList.add('twit-header')

        const nickname = document.createElement('p')
        nickname.classList.add('twit-nickname')
        nickname.textContent = this.nickname

        const title = document.createElement('p')
        title.classList.add('twit-title')
        title.textContent = this.title + ' | '

        const time = document.createElement('p')
        time.classList.add('twit-title')
        time.textContent = this.date

        twitHeader.append(nickname, title, time)

        return twitHeader
    }

    twitMenu() {
        const menu = document.createElement('div')
        menu.classList.add('twit-menu')

        const like = document.createElement('img')
        like.src = '../img/heart-regular.svg'
        const comment = document.createElement('img')
        comment.src = '../img/comment-regular.svg'

        menu.append(like, comment)

        return menu
    }

    twitBody() {
        const twitBody = document.createElement('div')
        twitBody.classList.add('twit-body')

        const isi = document.createElement('p')
        isi.classList.add('twit-isi')
        isi.innerHTML = this.isi.replace(regex, x => `<a href="${x}" target="_blank">${x}</a>`)

        const tag = document.createElement('p')
        tag.classList.add('twit-tag')
        tag.innerHTML = this.tag

        const date = document.createElement('p')
        date.classList.add('twit-time')
        date.innerHTML = this.date

        twitBody.append(isi, tag, this.twitMenu())

        return twitBody
    }

    showTwit() {
        return document.getElementById('sudah').append(this.twit)
    }
}