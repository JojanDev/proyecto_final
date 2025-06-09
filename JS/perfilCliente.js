export const perfil_cliente = () => {
  const btnAtras = document.querySelector('.btn-atras');

  btnAtras.addEventListener('click', () => {
    const vista = document.querySelector('#view-perfil-cliente');
    if (vista) vista.remove();

    const link = document.querySelector('#style-perfil-cliente');
    if (link) link.remove();
  })
}