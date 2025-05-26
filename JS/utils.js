export const obtenerClientes = async () => {
  const response = await fetch('../data.json');
  return await response.json();
}