# ChatApp

## Descripción

ChatApp es una aplicación de mensajería en tiempo real que permite a los usuarios comunicarse de manera instantánea. Construida con una arquitectura de frontend y backend, ofrece una interfaz de usuario intuitiva y funcionalidades robustas para la gestión de conversaciones.

## Tecnologías Utilizadas

- **Frontend**:
  - React: Biblioteca de JavaScript para construir interfaces de usuario.
  - TailwindCSS: Para el diseño y la presentación visual.

- **Backend**:
  - Node.js: Entorno de ejecución para JavaScript en el servidor.
  - Express: Framework para aplicaciones web en Node.js.
  - MongoDB: Base de datos NoSQL para el almacenamiento de datos.
  - Socket.io: Comunicación en tiempo real.
  - Autenticación: JWT (JSON Web Tokens).


## Características

- Mensajería en tiempo real entre usuarios.
- Interfaz de usuario amigable y receptiva.
- Gestión de usuarios y autenticación.
- Almacenamiento de conversaciones en una base de datos.

## Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tsukiyx/chatApp.git
   cd chatApp
   ```

2. **Instala las dependencias para el backend**:

   ```bash
   cd backend
   npm install
   ```

3. **Configura las variables de entorno**:

   Crea un archivo `.env` en el directorio `backend` con las siguientes variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

   Reemplaza `your_mongodb_connection_string` y `your_secret_key` con tus propios valores.

4. **Inicia el servidor backend**:

   ```bash
   npm start
   ```

5. **Instala las dependencias para el frontend**:

   ```bash
   cd ../frontend
   npm install
   ```

6. **Inicia la aplicación frontend**:

   ```bash
   npm start
   ```

   La aplicación debería estar disponible en `http://localhost:3000`.

## Estructura del Proyecto

El proyecto está organizado en dos directorios principales:

- **backend**: Contiene el código del servidor, incluyendo las rutas, modelos y controladores.

- **frontend**: Contiene el código de la interfaz de usuario construida con React.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu función o corrección de errores.
3. Realiza tus cambios y haz commit de ellos.
4. Envía una solicitud de pull para su revisión.
