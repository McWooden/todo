class Twit {
    constructor(data) {
        this.nickname = data.nickname
        this.title = data.title
        this.isi = data.isi
        this.tag = data.tag
        this.date = data.date
        this.time = data.time
        this.color = data.color
        this.token = data.token
        this.twit = this.createTwitElement()
        this.body = data
    }

    createTwitElement() {
        const twit = document.createElement('div')
        twit.classList.add('twit')
        twit.style.borderLeftColor = this.color
        twit.append(this.twitHeader(), this.twitBody())
        return twit
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
        time.textContent = this.time

        twitHeader.append(nickname, title, time)

        return twitHeader
    }

    twitBody() {
        const twitBody = document.createElement('div')
        twitBody.classList.add('twit-body')

        const isi = document.createElement('pre')
        isi.classList.add('twit-isi')
        isi.innerHTML = this.isi

        const tag = document.createElement('p')
        tag.classList.add('twit-tag')
        tag.innerHTML = this.tag

        const date = document.createElement('pre')
        date.classList.add('twit-time')
        date.innerHTML = this.date

        twitBody.append(isi, tag, date)

        return twitBody
    }

    showTwit() {
        return document.getElementById('sudah').append(this.twit)
    }
}