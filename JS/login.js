// import Swal from "./sweetalert2";

const validarSesion = async () => {
  const userInput = document.querySelector("#usuario");
  const passwdInput = document.querySelector("#contraseña");

  const response = await fetch("http://localhost:8080/api/personal/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: userInput.value,
      contrasena: passwdInput.value,
    }),
  });


  const data = await response.json();

  const personal = await fetch("http://localhost:8080/api/personal/");
  const personalData = await personal.json();
  console.log(personalData);
  

  console.log(data);

  if (data.code == 200) { 
    await Swal.fire({
      title: "Inicio de sesión",
      html: data.message,
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {},
    });
    return true;
  }

  if (data.code > 200) {
    Swal.fire({
      title: "Error!",
      text: data.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }

  // const usuarios = await response.json();

  // const usuariosFind = usuarios.find(({ usuario, contrasena }) => {
  //   if (usuario == userInput.value && contrasena == passwdInput.value)
  //     return this;
  // });

  // if (usuariosFind != undefined) {
  //   console.log("True");
  //   return true;
  // } else {
  //   alert("Mal");
  //   return false;
  // }
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
