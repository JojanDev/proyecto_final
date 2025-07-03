import { obtenerClientes } from "./utils.js";

const crearCliente = ({ id, info: {correo, direccion, idTipoDocumento, nombre, telefono}}) => {
  const tr = document.createElement('tr');
  const tdId = document.createElement('td');
  const tdCliente = document.createElement('td');
  const tdMascotas = document.createElement('td');
  const tdTelefono = document.createElement('td');
  const tdEmail = document.createElement('td');
  
  tr.setAttribute('data-id', id)

  tdId.textContent = id;
  tdCliente.textContent = nombre;
  tdMascotas.textContent = direccion;
  tdTelefono.textContent = telefono;
  tdEmail.textContent = correo;

  tr.classList.add('table__row-body',  'table__row', 'table__row-body-cliente');
  tdId.classList.add('table__cell-body',  'table__cell');
  tdCliente.classList.add('table__cell-body',  'table__cell');
  tdMascotas.classList.add('table__cell-body',  'table__cell');
  tdTelefono.classList.add('table__cell-body',  'table__cell');
  tdEmail.classList.add('table__cell-body',  'table__cell');

  tr.append(tdId, tdCliente, tdMascotas, tdTelefono, tdEmail);
  return tr;
}

export const registroCliente = () => {
  const btnRegistrar = document.querySelector('#registrar');
          
  btnRegistrar.addEventListener('click', (event) => {
    event.preventDefault();
  
    const camposNode = document.querySelectorAll('.form__input');
    const campos = [...camposNode].map((campo) => campo.value);
    const [nombreCompleto, tipoDocumento, numeroDocumento, telefono, email, direccion] = campos;
    
    const filaNueva = crearCliente({id: 1, nombreCompleto, numeroMascotas: 0, telefono, email});
    const tbody = document.querySelector('.table__body');
    tbody.append(filaNueva);
  })
}

export const cargarTabla = async () => {
  const clientes = await obtenerClientes();

  console.log(clientes);
  

  const tbody = document.querySelector('.table__body');

  clientes.data.forEach(cliente => {
    const row = crearCliente(cliente);
    tbody.append(row);
  });
}