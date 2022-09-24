class Twit {
    constructor(data) {
        this.nickname = data.nickname
        this.title = data.title
        this.isi = data.isi
        this.date = data.date
        this.time = data.time
        this.color = data.color
        this.token = data.token
        this.twit = this.createTwitElement(data)
    }

    createTwitElement() {
        const card = document.createElement('div')
        card.classList.add('card')
        card.textContent = this.isi
        card.style.borderLeftColor = this.color
        return card
    }

    showTwit() {
        return document.getElementById('belum').append(this.twit)
    }
}