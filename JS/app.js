//Importaciones
import { cargarTabla, registroCliente } from "./clientes.js";
import { obtenerClientes, agregarHTML, reemplazarHTML } from "./utils.js";
import { perfil_cliente } from "./perfilCliente.js";

//Variables
const clientes = document.querySelector('#clientes');
const head = document.querySelector('head');
const main = document.querySelector('.main');

//Eventos
document.addEventListener('DOMContentLoaded', (e) => {
  clientes.addEventListener('click', async () => {
    await reemplazarHTML('../Views/clientes.html', main);

    const link = document.createElement('link');    
    link.rel = 'stylesheet';
    link.href = '../css/clientes.css';
    head.appendChild(link);
    cargarTabla();
  })

  main.addEventListener('click', async (event) => {
    if (event.target.id === 'btn-registro-cliente') {
      await agregarHTML('../Views/registro_cliente.html', main);
  
      const linkRegistro = document.createElement('link');
      linkRegistro.rel = 'stylesheet';
      linkRegistro.href = '../css/registro_cliente.css';
      linkRegistro.setAttribute('id', 'style-registro-cliente');
      head.appendChild(linkRegistro);

      registroCliente();
    }

    if (event.target.id === 'back-registro') {
      const vista = document.querySelector('#view-registro-cliente');
      if (vista) vista.remove();
      
      const linkRegistro = document.querySelector('#style-registro-cliente');
      if (linkRegistro) linkRegistro.remove();
    }

    const fila = event.target.closest('.table__row-body-cliente');
    if (fila) {
      const idObjetivo = fila.dataset.id;
      // console.log(idObjetivo);

      const clientes = await obtenerClientes();
      const clienteObjetivo = clientes.data.find(({ id }) => id == idObjetivo); // == para comparar número con string
      console.log(clienteObjetivo);

      await agregarHTML('../Views/perfil_cliente.html', main);

      const linkRegistro = document.createElement('link');
      linkRegistro.rel = 'stylesheet';
      linkRegistro.href = '../css/perfil_cliente.css';
      linkRegistro.setAttribute('id', 'style-perfil-cliente');  
      head.appendChild(linkRegistro);
    }

    if (event.target.id == "back-perfil") {
      const vista = document.querySelector('#view-perfil-cliente');
      if (vista) vista.remove();
      
      const linkRegistro = document.querySelector('#style-perfil-cliente');
      if (linkRegistro) linkRegistro.remove();
    }

    if (event.target.className == 'btn-atras') {
      alert('hola')
    }
  });
})