function limpiarFormulario() {
  const inputs = document.querySelectorAll("input");
  const selects = document.querySelectorAll("select");

  inputs.forEach((input) => {
    input.value = "";
  });

  selects.forEach((select) => {
    select.selectedIndex = 0;
  });

  alert("¡Usuario registrado correctamente!");
}

const registrarInfoPersonal = async (infoPersonal) => {
  try {
    const response = await fetch(
      "http://localhost:8081/api/informacion-clientes-personal",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(infoPersonal),
      }
    );

    const data = await response.json();
    if (data.success) {
      console.log("Registro Ok");

      return data.id;
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error("Error de red o servidor:", error);
  }
};

async function registrarPersonal(personalData) {
  try {
    const response = await fetch("http://localhost:8081/api/personal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personalData),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    console.log("REGISTRO PERSONAL OK");
  } catch (error) {
    console.error("Error de red o servidor:", error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const selectTipoDocumento = document.getElementById("tipoDocumento");

  fetch("http://localhost:8081/api/tipos-documento")
    .then((response) => {
      if (!response.ok)
        throw new Error("Error al obtener los tipos de documento");
      return response.json();
    })
    .then((data) => {
      data.forEach((tipo) => {
        const option = document.createElement("option");
        option.value = tipo.id;
        option.textContent = tipo.nombre;
        selectTipoDocumento.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los tipos de documento:", error);
    });
});

document
  .getElementById("registrar")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const tipoDocumentoID = parseInt(
      document.getElementById("tipoDocumento").value
    );
    const numeroDocumento = document.getElementById("numeroDocumento").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const direccion = document.getElementById("direccion").value;

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    const infoPersonal = {
      idTipoDocumento: tipoDocumentoID,
      numeroDocumento: numeroDocumento,
      nombre: nombre,
      telefono: telefono,
      correo: correo,
      direccion: direccion,
    };

    const insertInfo = await registrarInfoPersonal(infoPersonal);
    if (insertInfo) {
      const datosAcceso = {
        usuario: usuario,
        contrasena: contrasena,
        id_info: insertInfo,
      };

      registrarPersonal(datosAcceso);
    }

    limpiarFormulario();
  });
