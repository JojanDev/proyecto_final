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
    const htmlM = document.querySelector('.html');

    const cargarHTML = (url) => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                console.log(html);
                htmlM.innerHTML = html; // Cargar el contenido HTML
            })
            .catch(error => {
                console.error("Error cargando el HTML:", error);
            });
    }

    boton.addEventListener("click", function (event) {
      event.preventDefault(); // ← Evita que el formulario se envíe

      if(validarSesion()){
            // cargarHTML('home.html');
            window.location.href = "home.html";
        };

    })
  });
