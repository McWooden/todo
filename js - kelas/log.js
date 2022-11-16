function jadwalConfig() {
    const c = document.createElement('div')
    c.classList.add('container-jadwal')
        const judul = document.createElement('h3')
        judul.textContent = 'Jadwal'
        const form = document.createElement('form')
        form.setAttribute('id', 'gantiJadwal')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            if (title != 'Owner' && title != 'Admin') {
                console.log(title, title != 'Owner')
                console.log(title, title != 'Admin')
                console.log(title != 'Owner' && title != 'Admin')
                return new myAlert(() => hideShadow(), {msg: 'kau bukan admin'}).render()
            }
            new myAlert(async () => {
                let waktu = 1
                const data = new FormData()
                const file = input.files[0]
                data.append('img', file)

                const options = {
                    method: 'put',
                    body: data,
                }
                const jalankanWaktu = setInterval(() => {
                    submit.value = waktu++
                    console.log(waktu)
                    console.log(submit.value)
                }, 1000)
                if (file.type.split('/')[0] == 'image') {
                    await fetch(`${url}/jadwal`, options).then(() => {
                        popup(alertMsg.save)
                        clearInterval(jalankanWaktu)
                        submit.value = 'Ganti'
                    }).catch(() => {
                        clearInterval(jalankanWaktu)
                        submit.value = 'Ganti'
                    })
                    console.log('input is image')
                } else {
                    setTimeout(() => {
                        new myAlert(() => {
                            console.log('failed')
                        }, {msg: 'tipe file yang anda kirim bukan "image"'}).render()
                    }, 300)
                    clearInterval(jalankanWaktu)
                    submit.value = 'Ganti'
                    console.log('input isnt image')
                }
            }, {msg: 'Mengganti jadwal?'}).render()
        })
            const input = document.createElement('input')
                input.setAttribute('type', 'file')
                input.name = 'inpFile'
                input.setAttribute('required', true)
                input.accept = 'image/*'
            const submit = document.createElement('input')
                submit.setAttribute('type', 'submit')
                submit.name = 'subFIle'
                submit.value = 'Ganti'
        form.append(input, submit)

    c.append(judul, form)
    document.getElementById('belum').append(c)
}
async function handleClickJadwal() {    
    const jadwal = await fetch(`${url}/jadwal`).then(res => res.json())
    shadow.innerHTML = ''
    new imgFullScreen(`${urlImage}${jadwal.image}`, 'jadwal').render()
    setTimeout(() => {
        shadow.style.opacity = '1'
    }, 200)
}