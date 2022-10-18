alertMsg = {
    reload: {
        link: 'img/rotate-right-solid.svg',
        bgColor: '#0D7377'
    },
    add: {
        link: 'img/plus-solid.svg',
        bgColor: '#A27B5C'
    },
    delete: {
        link: 'img/trash-solid-white.svg',
        bgColor: '#774360'
    },
    check: {
        link: 'img/check-solid.svg',
        bgColor: '#0D7377'
    },
    reply: {
        link: 'img/reply-solid.svg',
        bgColor: '#A27B5C'
    },
    edit: {
        link: 'img/pen-to-square-solid.svg',
        bgColor: '#2b2f42'
    },
    save: {
        link: 'img/floppy-disk-solid.svg',
        bgColor: '#277BC0'
    },
    feather: {
        link: 'img/feather-light-solid.svg',
        bgColor: '#1d9bf0'
    },
    like: {
        link: 'img/heart-solid.svg',
        bgColor: '#2b2f42'
    },
    unlike: {
        link: 'img/heart-regular.svg',
        bgColor: '#2b2f42'
    }
}
function popup(imgLink) {
    const alertImg = document.createElement('img')
    alertImg.src = imgLink.link
    alertImg.style.backgroundColor = imgLink.bgColor
    document.getElementById('alert').appendChild(alertImg)

    setTimeout(() => {
        alertImg.style.opacity = '0'
        alertImg.style.transform = 'translateX(-5px)'
    }, 2000)
    setTimeout(() => {
        alertImg.remove()
    }, 2100)
}