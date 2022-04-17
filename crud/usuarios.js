const express = require("express");
const routes = express.Router();

// select de usuarios para iniciar sesión en el sistema
routes.get("/login", (req, res) => {
  const { usuario, contrasena } = req.query;
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `SELECT idusuario, DATE_FORMAT(fecha_registro, '%d/%m/%Y') as fecha_registro, 
      nombrecompleto, genero, telefono,
      celular, estado, 
      nombreusuario, usuario_insercion,
      usuario_actualizacion, DATE_FORMAT(fecha_actualizacion, '%d/%m/%Y') as fecha_actualizacion, 
      tipodeusuario
FROM usuarios WHERE UPPER(nombreusuario) = UPPER(?)
 AND contrasena = MD5(SHA1(?))
 AND estado = 'Activo'`,
      [usuario, contrasena],
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

// mostrar todos los usuarios
routes.get("/todos_los_usuarios", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `SELECT idusuario, DATE_FORMAT(fecha_registro, '%d/%m/%Y') as fecha_registro, 
      nombrecompleto, genero, telefono,
      celular, estado,
      nombreusuario, usuario_insercion,
      usuario_actualizacion, DATE_FORMAT(fecha_actualizacion, '%d/%m/%Y') as fecha_actualizacion, 
      tipodeusuario FROM usuarios`,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

// insertar usuario
routes.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    const { newUser } = req.body
    newUser.fecha_registro = new Date()
    if (err) return res.send(err);
    conn.query(`INSERT INTO usuarios SET ?`, newUser, (err, results) => {
      if (err) return res.send(err);
      res.send({
        ok: true,
        rowsInserted: results.affectedRows,
      })
    });
  });
});

// actualizar usuario
routes.put("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    const { user } = req.body
    user.fecha_actualizacion = new Date()
    if (err) return res.send(err);
    conn.query(
      `UPDATE usuarios set ? WHERE idusuario = ?`,
      [user, req.params.id],
      (err, results) => {
        if (err) return res.send(err);
        res.send({
          ok: true,
          rowsInserted: results.affectedRows,
        });
      }
    );
  });
});

// count de todos los usuarios
routes.get("/total_de_usuarios", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(`SELECT COUNT(*) as total FROM usuarios`, (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// count de usuarios por estado
routes.get("/usuarios_por_estado", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(`select estado, count(estado) as total from usuarios 
group by estado`, (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// count de usuarios por género
routes.get("/usuarios_por_genero", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(`select genero, count(genero) as total from usuarios 
group by genero`, (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Seleccionar último usuario registrado
routes.get("/ultimo_usuario_registrado", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(`Select nombrecompleto as UltimoUsuarioRegistrado from usuarios order by idusuario DESC LIMIT 1`, (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Mostrar todos los usuarios masculinos
routes.get("/todos_los_usuarios_masculinos", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `SELECT idusuario, DATE_FORMAT(fecha_registro, '%d/%m/%Y') as fecha_registro,
      nombrecompleto, genero, telefono,
      celular, estado,
      nombreusuario, usuario_insercion,
      usuario_actualizacion, DATE_FORMAT(fecha_actualizacion, '%d/%m/%Y') as fecha_actualizacion,
      tipodeusuario FROM usuarios where genero = 'Masculino'`,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

// Mostrar todos los usuarios femeninos
routes.get("/todos_los_usuarios_femeninos", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `SELECT idusuario, DATE_FORMAT(fecha_registro, '%d/%m/%Y') as fecha_registro,
      nombrecompleto, genero, telefono,
      celular, estado,
      nombreusuario, usuario_insercion,
      usuario_actualizacion, DATE_FORMAT(fecha_actualizacion, '%d/%m/%Y') as fecha_actualizacion,
      tipodeusuario FROM usuarios where genero = 'Femenino'`,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

// Mostrar todos los usuarios activos
routes.get("/todos_los_usuarios_activos", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `SELECT idusuario, DATE_FORMAT(fecha_registro, '%d/%m/%Y') as fecha_registro,
      nombrecompleto, genero, telefono,
      celular, estado,
      nombreusuario, usuario_insercion,
      usuario_actualizacion, DATE_FORMAT(fecha_actualizacion, '%d/%m/%Y') as fecha_actualizacion,
      tipodeusuario FROM usuarios where estado = 'Activo'`,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

// Mostrar todos los usuarios inactivos
routes.get("/todos_los_usuarios_inactivos", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `SELECT idusuario, DATE_FORMAT(fecha_registro, '%d/%m/%Y') as fecha_registro,
      nombrecompleto, genero, telefono,
      celular, estado,
      nombreusuario, usuario_insercion,
      usuario_actualizacion, DATE_FORMAT(fecha_actualizacion, '%d/%m/%Y') as fecha_actualizacion,
      tipodeusuario FROM usuarios where estado = 'Inactivo'`,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

// Mostrar todos los usuarios de tipo 'Administrador'
routes.get("/todos_los_usuarios_administrador", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `SELECT idusuario, DATE_FORMAT(fecha_registro, '%d/%m/%Y') as fecha_registro,
      nombrecompleto, genero, telefono,
      celular, estado,
      nombreusuario, usuario_insercion,
      usuario_actualizacion, DATE_FORMAT(fecha_actualizacion, '%d/%m/%Y') as fecha_actualizacion,
      tipodeusuario FROM usuarios where tipodeusuario = 'Administrador'`,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

// Mostrar todos los usuarios de tipo 'Usuario'
routes.get("/todos_los_usuarios_usuario", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `SELECT idusuario, DATE_FORMAT(fecha_registro, '%d/%m/%Y') as fecha_registro,
      nombrecompleto, genero, telefono,
      celular, estado,
      nombreusuario, usuario_insercion,
      usuario_actualizacion, DATE_FORMAT(fecha_actualizacion, '%d/%m/%Y') as fecha_actualizacion,
      tipodeusuario FROM usuarios where tipodeusuario = 'Usuario'`,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

module.exports = routes;