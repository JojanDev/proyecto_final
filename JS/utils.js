export const obtenerClientes = async () => {
  const response = await fetch('../data.json');
  return await response.json();
}

export const reemplazarHTML = async (url, destino) => {
  const response = await fetch(url); 
  const html = await response.text();
  destino.innerHTML = html;
}

export const agregarHTML = async (url, destino) => {
  const response = await fetch(url); 
  const html = await response.text();
  destino.innerHTML += html;
}