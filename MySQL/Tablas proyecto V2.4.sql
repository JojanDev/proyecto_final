drop database if exists veterinaria_pipos;
create database veterinaria_pipos;
use veterinaria_pipos;

CREATE TABLE tipos_documento (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255)
);

CREATE TABLE informacion_clientes_personal (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_tipo_documento INT,
	numero_documento VARCHAR(50),
	nombre VARCHAR(255),
	telefono VARCHAR(20),
	correo VARCHAR(255),
	direccion VARCHAR(255),
	FOREIGN KEY (id_tipo_documento) REFERENCES tipos_documento(id)
);

CREATE TABLE personal (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_info INT,
	usuario VARCHAR(100) UNIQUE NOT NULL,
	contrasena VARCHAR(255),
	FOREIGN KEY (id_info) REFERENCES informacion_clientes_personal(id)
);

CREATE TABLE clientes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_info INT,
	FOREIGN KEY (id_info) REFERENCES informacion_clientes_personal(id)
);

CREATE TABLE especies (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255)
);

CREATE TABLE razas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	id_especie INT,
	FOREIGN KEY (id_especie) REFERENCES especies(id)
);

CREATE TABLE mascotas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_cliente INT,
	nombre VARCHAR(255),
	id_raza INT,
	edad INT,
	sexo ENUM('macho', 'hembra') NOT NULL,
	estado_vital ENUM('activo', 'fallecido', 'extraviado'),
	FOREIGN KEY (id_cliente) REFERENCES clientes(id),
	FOREIGN KEY (id_raza) REFERENCES razas(id)
);

CREATE TABLE antecedentes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_mascota INT,
	diagnositco TEXT,
	fecha_creado DATETIME,
	FOREIGN KEY (id_mascota) REFERENCES mascotas(id)
);

-- Tabla de los tratamiento de los antecedentes
CREATE TABLE antecedentes_tratamientos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_antecedente INT,
    descripcion TEXT,
    FOREIGN KEY (id_antecedente) REFERENCES antecedentes(id)
);

CREATE TABLE tipos_productos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50)
);


CREATE TABLE productos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	precio DECIMAL(7,2),
	descripcion TEXT,
	fecha_caducidad DATETIME,
	id_tipo int,
	stock INT,
    FOREIGN KEY (id_tipo) REFERENCES tipos_productos(id)
);

CREATE TABLE medicamentos_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,              -- Nombre comercial del medicamento
    uso_general VARCHAR(255),                  -- ¿Para qué sirve? (dolor, infecciones, etc.)
    especie_destinada VARCHAR(100),            -- Ej: perro, gato, aves, todos
    via_administracion VARCHAR(100),           -- Ej: oral, inyectable
    presentacion VARCHAR(100),                 -- Ej: tabletas, jarabe, polvo, solución
    informacion_adicional TEXT                 -- Texto libre con cualquier cosa útil
);

-- Medicamentos registrados en inventario
CREATE TABLE medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT UNIQUE,
    id_info INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_info) REFERENCES medicamentos_info(id)
);

CREATE TABLE lotes_medicamento (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_medicamento INT,
	fecha_caducidad DATE,
	cantidad INT,
	numero_lote VARCHAR(100),
	FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id)
);

CREATE TABLE medicamentos_tratamiento (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_tratamiento INT,
	id_medicamento_info INT, 
	dosis VARCHAR(100),
	frecuencia_aplicacion VARCHAR(100),
	duracion INT,
	FOREIGN KEY (id_tratamiento) REFERENCES antecedentes_tratamientos(id),
	FOREIGN KEY (id_medicamento_info) REFERENCES medicamentos_info(id)
);


CREATE TABLE ventas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_cliente INT,
	fecha DATETIME,
	total DECIMAL(7,2),
	FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

CREATE TABLE detalles_ventas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_venta INT,
	id_producto INT,
	cantidad INT,
	subtotal DECIMAL(7,2),
	FOREIGN KEY (id_venta) REFERENCES ventas(id),
	FOREIGN KEY (id_producto) REFERENCES productos(id)
);

CREATE TABLE mascotas_productos_aviso(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto int, 
    id_mascota int,
    fecha_inicio datetime,
    fecha_fin datetime,
    frecuencia_aviso int,
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_mascota) REFERENCES mascotas(id)
);

show tables;

-- 1. Insertar tipos de documento
INSERT INTO tipos_documento (nombre) VALUES
('Cédula de ciudadanía'),
('Tarjeta de identidad'),
('Cédula de extranjería');

-- 2. Insertar información personal (referenciando id_tipo_documento)
INSERT INTO informacion_clientes_personal (id_tipo_documento, numero_documento, nombre, telefono, correo, direccion) VALUES
(1, '1234567890', 'Juan Pérez', '3001234567', 'juan@example.com', 'Calle 123 #45-67'),
(2, '9876543210', 'Laura Gómez', '3019876543', 'laura@example.com', 'Carrera 10 #20-30'),
(1, '1122334455', 'Carlos Ramírez', '3021122334', 'carlos@example.com', 'Diagonal 15 #33-12');

-- 3. Insertar personal (ahora con usuario incluido)
INSERT INTO personal (id_info, usuario, contrasena) VALUES
(1, 'juanp', '1234admin'),
(2, 'laurag', '5678emp'),
(3, 'carlosr', 'abcd1234');

select * from personal;

INSERT INTO personal (id_info, usuario, contrasena) VALUES
(1, 'johan', 'johan123');

select * from informacion_clientes_personal;

DELETE FROM personal;