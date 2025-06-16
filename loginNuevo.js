const getPersonal = async () => {
  const response = await fetch('http://localhost:8081/api/personal');
  const data = await response.json();
  const usuariosFind = data.find(({ usuario, contrasena }) => {
    if (usuario == "juanp" && contrasena == "1234admin") return this;
  })
  
  console.log(usuariosFind);
  
}

getPersonal();