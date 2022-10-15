const shadow = document.getElementById('shadow')
const moreOption = document.getElementById('more-option')
shadow.addEventListener('click', (e) => {
    if (e.target == shadow) hideShadow()
    if (e.target.dataset.option == 'edit') console.log('mengedit')
})
const showShadow = () => {
    shadow.style.display = 'flex'
}
const hideShadow = () => {
    shadow.style.display = 'none'
}