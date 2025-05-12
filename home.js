const clientes = document.querySelector('#clientes');
const head = document.querySelector('head');

clientes.addEventListener('click', () => {
    const main = document.querySelector('.main');
    
    const cargarHTML = (url) => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                console.log(html);
                main.innerHTML = html; // Cargar el contenido HTML
            })
            .catch(error => {
                console.error("Error cargando el HTML:", error);
            });
    }

    cargarHTML('clientes.html');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/clientes.css';
    head.appendChild(link);
})