document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('open-modal');
    const closeButton = document.querySelector('.close-button');

    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            document.querySelector('.modal-content h2').textContent = config.title;
            document.querySelector('.modal-content p').textContent = config.content; });

    openModalButton.addEventListener('click', () => {
        modal.style.display = 'block'; });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none'; } }); });