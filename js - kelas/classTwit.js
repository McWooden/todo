class Twit {
    constructor(data) {
        this.id = data._id
        this.picture = data.picture
        this.nickname = data.nickname
        this.title = data.title
        this.isi = data.isi
        this.tag = data.tag
        this.date = data.date
        this.time = data.time
        this.color = data.color
        this.token = data.token
        this.likeCount = data.like
        this.commentCount = data.twitComment
        this.shadow = {
            id: data._id,
            nickname: data.nickname,
            isi: data.isi,
            date: data.date,
            comment: data.twitComment
        }
        this.twit = this.createTwitElement()
    }

    createTwitElement() {
        const twit = document.createElement('div')
        twit.classList.add('twit')
        twit.setAttribute('id', this.id)
        twit.append(this.formPicture(), this.formContainer())
        this.nickname == nickname && twit.append(this.twitOption())
        if (document.getElementById('sudah').innerHTML != '') twit.style.borderTop = '.25px solid #62657a43'
        return twit
    }

    formPicture() {
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('twit-img')

        const picture = document.createElement('img')
        picture.classList.add('user-img')
        picture.setAttribute('loading', 'lazy')
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
        title.textContent = this.title + ' '

        twitHeader.append(nickname, title)

        return twitHeader
    }

    twitBody() {
        const twitBody = document.createElement('div')
        twitBody.classList.add('twit-body')

        const isi = document.createElement('span')
        isi.classList.add('twit-isi')
        isi.innerHTML = this.isi.replaceAll(regex, (x) => `<span style="color:goldenrod;">${x.replace(regex, x => x.slice(x.indexOf('//') + 2, x.indexOf('/', x.indexOf('//') + 2)))}</span>`)

        const date = document.createElement('p')
        date.classList.add('twit-time')
        date.innerHTML = this.date

        twitBody.append(isi, this.twitMenu())

        return twitBody
    }
    twitOption() {
        const option = document.createElement('img')
        option.classList.add('twit-option')
        option.setAttribute('src', 'img/ellipsis-solid.svg')
        option.addEventListener('click', () => {
            new twitShadow(this.id, this.nickname).showOption()
        })
        return option
    }

    twitMenu() {
        const div = document.createElement('div')
        div.classList.add('twit-footer')
        
        const menu = document.createElement('div')
        menu.classList.add('twit-menu')
        
        const tag = document.createElement('p')
        tag.classList.add('twit-tag')
        tag.innerHTML = this.tag

        const like = document.createElement('img')
        like.setAttribute('src', 'img/heart-regular.svg')
        const unlike = document.createElement('img')
        unlike.setAttribute('src', 'img/heart-solid.svg')
        like.addEventListener('click', async () => {
            await this.addLike()
            document.dispatchEvent(new Event('renderTugas'))
        })
        unlike.addEventListener('click', async () => {
            await this.deleteLike()
            document.dispatchEvent(new Event('renderTugas'))
        })

        const likeCount = document.createElement('span')
        likeCount.classList.add('twit-count')
        likeCount.textContent = this.likeCount.length
        likeCount.addEventListener('click', () => {
            new myAlert(() => {hideShadow()}, {msg: `${this.likeCount.map(x => `<p>${x}</p>`).join('')}`}).render()
        })

        const comment = document.createElement('img')
        comment.setAttribute('src', 'img/comment-regular.svg')
        comment.addEventListener('click', () => {
            new commentTwit(this.shadow).showComment()
        })

        const commentCount = document.createElement('span')
        commentCount.classList.add('twit-count')
        commentCount.textContent = this.commentCount.length

        if (this.likeCount.indexOf(nickname) == -1) {
            menu.append(likeCount, like)
        } else {
            menu.append(likeCount, unlike)
            likeCount.classList.add('text-pink')
        }
        menu.append(comment)
        div.append(tag, menu)

        return div
    }

    async addLike() {
        await fetch(`${url}/twit/addLike`, {
            method: "PUT",
            body: JSON.stringify({id: this.id, nickname, token}),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(popup(alertMsg.like))
    }
    async deleteLike() {
        await fetch(`${url}/twit/deleteLike`, {
            method: "PUT",
            body: JSON.stringify({id: this.id, nickname, token}),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(popup(alertMsg.unlike))
    }

    showTwit() {
        return document.getElementById('sudah').append(this.twit)
    }
}
