const clientes = document.querySelector('#clientes');
const head = document.querySelector('head');
const main = document.querySelector('.main');

const reemplazarHTML = async (url, destino) => {
    const response = await fetch(url); 
    const html = await response.text();
    destino.innerHTML = html;
}

const agregarHTML = async (url, destino) => {
    const response = await fetch(url); 
    const html = await response.text();
    destino.innerHTML += html;
}

document.addEventListener('DOMContentLoaded', (e) => {
    clientes.addEventListener('click', async () => {
        await reemplazarHTML('clientes.html', main);
    
        const link = document.createElement('link');    
        link.rel = 'stylesheet';
        link.href = 'css/clientes.css';
        head.appendChild(link);
    })

    main.addEventListener('click', async (event) => {
        if (event.target.id === 'btn-registro-cliente') {
            await agregarHTML('registro_cliente.html', main);
        
            const linkRegistro = document.createElement('link');
            linkRegistro.rel = 'stylesheet';
            linkRegistro.href = 'css/registro_cliente.css';
            linkRegistro.setAttribute('id', 'style-registro-cliente');
            head.appendChild(linkRegistro);
        }

        if (event.target.id === 'back-registro') {
            const vista = document.querySelector('#view-registro-cliente');
            if (vista) vista.remove();
            
            const linkRegistro = document.querySelector('#style-registro-cliente');
            if (linkRegistro) linkRegistro.remove();
        }
    });
})


const crearCliente = ({id, nombreCompleto, numeroMascotas, telefono, email}) => {
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdCliente = document.createElement('td');
    const tdMascotas = document.createElement('td');
    const tdTelefono = document.createElement('td');
    const tdEmail = document.createElement('td');
    
    tr.setAttribute('data-id', id)

    tdId.textContent = id;
    tdCliente.textContent = nombreCompleto;
    tdMascotas.textContent = numeroMascotas;
    tdTelefono.textContent = telefono;
    tdEmail.textContent = email;

}