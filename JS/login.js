const user = 'admin'
const passwd = 'admin';

const validarSesion = () => {
  const userInput = document.querySelector('#usuario');
  const passwdInput = document.querySelector('#contraseña');

  if (userInput.value === user && passwdInput.value === passwd) {
      console.log("True");
      
      return true;
  }else{
      alert('Mal');
      return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("btn-acceder");

  boton.addEventListener("click", function (event) {
    event.preventDefault();

    if(validarSesion())
      window.location.href = "Views/home.html";
  })
});
