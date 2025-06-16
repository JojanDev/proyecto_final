const validarSesion = async () => {
  const userInput = document.querySelector('#usuario');
  const passwdInput = document.querySelector('#contraseña');

  const response = await fetch('http://localhost:8081/api/personal');
  const usuarios = await response.json();
  
  const usuariosFind = usuarios.find(({ usuario, contrasena }) => {
    if (usuario == userInput.value && contrasena == passwdInput.value) return this;
  })
  
  if (usuariosFind != undefined) {
      console.log("True");
      return true;
  }else{
      alert('Mal');
      return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-acceder");

  boton.addEventListener("click", async (event) => {
    event.preventDefault();
    
    if (await validarSesion()) {
      window.location.href = "Views/home.html";
    }
  })
});
