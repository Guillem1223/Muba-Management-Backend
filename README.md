# Muba Management BackEnd

Este proyecto es un backend para una aplicación con Express, Sequelize y MySQL.

## Dependencias

- bcrypt: "^5.1.0"
- cookie-parser: "~1.4.4"
- cors: "^2.8.5"
- debug: "~2.6.9"
- dependencies: "^0.0.1"
- dotenv: "^16.0.3"
- express: "^4.18.2"
- http-errors: "~1.6.3"
- jade: "^0.29.0"
- jsonwebtoken: "^9.0.0"
- morgan: "~1.9.1"
- mysql2: "^3.1.0"
- sequelize: "^6.28.0"
- sequelize-auto: "^0.8.8"

## Instalación

1. Clona este repositorio
2. Ejecuta `npm install` para instalar las dependencias.
3. Copia el archivo `.env.example` y renómbralo a `.env`. Luego, completa las variables de entorno con la información necesaria.

## Uso

1. Ejecuta `npm run dev` para iniciar el servidor.
2. Las rutas están organizadas en diferentes archivos en la carpeta `/routes`.

## Rutas

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |

| GET | /users/find/:role | Devuelve los usuarios filtrados por rol. |
| POST | /users/reg | Registra un nuevo usuario. |
| DELETE | /users/delete/:id | Elimina un usuario por su ID. |
| PUT | /users/update/:id | Actualiza la información de un usuario por su ID. |
| POST | /users/login | Inicia sesión con un usuario registrado. |
| POST | users/contract | Registra un nuevo contrato. |
| GET | users/performers/:id | Devuelve la información de un intérprete por su ID. |
| GET | users/contractor/:id | Devuelve la información de un contratista por su ID. |
| GET | users/find/:role | Devuelve todos los usuarios y gestiona informacion especifica de cada role. ||
