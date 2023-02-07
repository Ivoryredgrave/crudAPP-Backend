// Librerias
const express = require("express");
const mysql = require("mysql");
const app = express();
const myconn = require("express-myconnection");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

// Importando usuarios.js para la ruta
const usuarios = require("./crud/usuarios");

// Configuración de la base de datos MySQL
app.set("port", process.env.PORT || 9000);
const dbOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "crudapp"
};

// Middlewares
app.use(myconn(mysql, dbOptions, "single"));
app.use(express.json());
app.use(cors());

// Rutas
app.use(express.static("public"));
app.use("/api/usuarios", usuarios);

// Servidor en línea
server.listen(app.get("port"), () => {
  console.log(`- Servidor en línea en puerto *:${app.get("port")}`);
});