document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            modals.forEach((modal, index) => {
                modal.querySelector('h2').textContent = config.modals[index].title;
                modal.querySelector('p').textContent = config.modals[index].content; 
            }); 
        })
        .catch(error => {
            console.error('Ошибка при загрузке конфигурации:', error); });

    openModalButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            modals[index].style.display = 'block';
         });
    });

    closeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            modals[index].style.display = 'none'; 
        }); 
    });

    modals.forEach(modal => {
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none'; } 
            }); 
        }); 
    });
