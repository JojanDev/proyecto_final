//Funcion para validar los datos de inicio de sesion
const validarSesion = async () => {
  //Se obtienen los datos ingresados
  const userInput = document.querySelector("#usuario");
  const passwdInput = document.querySelector("#contraseña");

  //Se realiza la peticion
  const response = await fetch("http://localhost:8081/api/personal/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: userInput.value,
      contrasena: passwdInput.value,
    }),
  });

  //Se obtiene la respuesta
  const data = await response.json();

  //Se valida el inicio exitoso
  if (data.code == 200) {
    //Se muestra un mensaje
    await Swal.fire({
      title: "Inicio de sesión",
      html: data.message,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {},
    });
    return true;
  }

  //Se valida si ocurrio un error
  if (data.code > 200) {
    //Se muestra un mensaje
    Swal.fire({
      title: "Error!",
      text: data.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-acceder");

  boton.addEventListener("click", async (event) => {
    event.preventDefault();

    if (await validarSesion()) {
      window.location.href = "Views/home.html";
    }
  });
});
