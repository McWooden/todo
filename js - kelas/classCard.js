class Card {
    constructor(data) {
        this.id = data._id
        this.tugas = data.tugas
        this.deskripsi = data.deskripsi
        this.color = data.color
        this.mulai = data.mulai
        this.berakhir = data.berakhir
        this.by = data.by
        this.selesai = data.selesai
        this.card = this.createCardELement()
    }

    createCardELement() {
        const card = document.createElement('div')
        card.classList.add('card')
        card.setAttribute('id', this.id)
        card.append(this.createText(), this.createButton(), this.edit())
        card.style.borderLeftColor = this.color
        card.dataset.by = this.by
        card.dataset.color = this.color
        card.dataset.date = `${this.mulai} | ${this.berakhir}`
        return card
    }

    createText() {
        const cardText = document.createElement('div')
        cardText.classList.add('card-text')
        const textTitle = document.createElement('p')
        textTitle.innerText = this.tugas
        const deskripsiText = document.createElement('pre')
        deskripsiText.classList.add('text-time')
        deskripsiText.innerHTML = this.deskripsi
        cardText.append(textTitle, deskripsiText)
        return cardText
    }

    createButton() {
        const cardBtn = document.createElement('div')
        cardBtn.classList.add('card-btn')
        if (this.selesai) {
            cardBtn.append(this.reply(), this.trash())
        } else {
            cardBtn.append(this.checklist())
        }
        if (title == 'Owner' || title == 'Admin' || title == 'X-6') {
            cardBtn.style.display = 'inherit'
        } else {
            cardBtn.style.display = 'none'
        }
        return cardBtn
    }
    
    checklist() {
        const centang = document.createElement('img')
        centang.classList.add('centang')
        centang.setAttribute('src', 'img/check-solid.svg')
        centang.addEventListener('click', () => {
            this.reverse()
            popup(alertMsg.check)
        })
        return centang
    }

    reply() {
        const ulangi = document.createElement('img')
        ulangi.classList.add('ulangi')
        ulangi.setAttribute('src', 'img/reply-solid.svg')
        ulangi.addEventListener('click', () => {
            this.reverse()
            popup(alertMsg.reply)
        })
        return ulangi
    }

    trash() {
        const buang = document.createElement('img')
        buang.classList.add('buang')
        buang.setAttribute('src', 'img/trash-solid.svg')
        buang.addEventListener('click', () => {
            this.deleteItem(this.id)
            popup(alertMsg.delete)
        })
        return buang
    }

    edit() {
        const editBtn = document.createElement('img')
        editBtn.classList.add('editBtn')
        if (this.selesai) {
            editBtn.setAttribute('src', 'img/pen-to-square-solid-dark.svg')
        } else {
            editBtn.setAttribute('src', 'img/pen-to-square-solid.svg')
        }
        editBtn.addEventListener('click', () => {
            this.editCard(this.id)
            popup(alertMsg.edit)
        })
        if (title == 'Owner' || title == 'Admin') {
            editBtn.style.display = 'inherit'
        } else {
            editBtn.style.display = 'none'
        }
        return editBtn
    }

    async reverse() {
        await fetch(`${url}/reverse`, {
            method: "PUT",
            body: JSON.stringify({id: this.id, selesai: this.selesai, token}),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(this.cardHilang())
    }

    async deleteItem() {
        await fetch(`${url}/${this.id}`, {
            method: 'DELETE',
            body: JSON.stringify({token}),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(this.cardHilang())
    }

    async editCard(id) {
        await fetch(`${url}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({token}),
                headers: {
                    'Content-Type': "application/json"
                }
            }).then(res => res.json()).then(x => {
                formState.isEdit = true
                document.getElementById('tugas').value = x.tugas
                document.getElementById('deskripsi').value = x.deskripsi
                document.getElementById('mulai').value = x.mulai
                document.getElementById('tanggal').value = x.berakhir
                document.getElementById('color').value = x.color
                if (document.getElementById('color').value == '#000000') {
                    document.getElementById('color').value = '#31364c'
                }
                document.getElementById('btnUpdate').style.visibility = 'visible'
                this.getEditStatus()
        })
    }

    getEditStatus() {
        document.getElementById('dateNow').innerText = ''
        document.getElementById('day').innerText = this.tugas
        document.getElementById('month').innerText = this.id
        document.getElementById('year').innerText = this.selesai
        document.getElementById('greet').innerText = 'Mengubah data:' 
    }

    cardHilang() {
        document.getElementById(this.id).style.opacity = '0'
        setTimeout(() => {
            document.getElementById(this.id).style.display = 'none'
        }, 300)
    }

    showCard() {
        if (this.selesai) {
            return document.getElementById('sudah').appendChild(this.card)
        } else {
            return document.getElementById('belum').appendChild(this.card)
        }
    }
}