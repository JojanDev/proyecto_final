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
      cargarTabla();
    })

    main.addEventListener('click', async (event) => {
      if (event.target.id === 'btn-registro-cliente') {
        await agregarHTML('registro_cliente.html', main);
    
        const linkRegistro = document.createElement('link');
        linkRegistro.rel = 'stylesheet';
        linkRegistro.href = 'css/registro_cliente.css';
        linkRegistro.setAttribute('id', 'style-registro-cliente');
        head.appendChild(linkRegistro);
        
        const btnRegistrar = document.querySelector('#registrar');
        
        btnRegistrar.addEventListener('click', (event) => {
          event.preventDefault();

          const camposNode = document.querySelectorAll('.form__input');
          const campos = [...camposNode].map((campo) => campo.value);
          const [nombreCompleto, tipoDocumento, numeroDocumento, telefono, email, direccion] = campos;
          console.log(nombreCompleto);
          
          
          const filaNueva = crearCliente({id: 1, nombreCompleto, numeroMascotas: 0, telefono, email});
          const tbody = document.querySelector('.table__body');
          tbody.append(filaNueva);
        })
        
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

  tr.classList.add('table__row-body',  'table__row');
  tdId.classList.add('table__cell-body',  'table__cell');
  tdCliente.classList.add('table__cell-body',  'table__cell');
  tdMascotas.classList.add('table__cell-body',  'table__cell');
  tdTelefono.classList.add('table__cell-body',  'table__cell');
  tdEmail.classList.add('table__cell-body',  'table__cell');

  tr.append(tdId, tdCliente, tdMascotas, tdTelefono, tdEmail);
  return tr;
}

const cargarTabla = async () => {
  const clientes = await obtenerClientes();

  const tbody = document.querySelector('.table__body');

  clientes.forEach(cliente => {
    const row = crearCliente(cliente);
    tbody.append(row);
  });
}

const obtenerClientes = async () => {
  const response = await fetch('data.json');
  return await response.json();
}