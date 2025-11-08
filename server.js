const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Variable para almacenar el mensaje actual (texto compuesto)
let currentMessage = "";

// Servir archivos estáticos
app.use(express.static("public"));

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "rootpassword",
  database: process.env.DB_NAME || "lsm_db",
};

let db;

// Conectar a la base de datos
async function connectDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log("✅ Conectado a la base de datos MySQL");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
    setTimeout(connectDB, 5000); // Reintentar conexión después de 5 segundos
  }
}

connectDB();

// Endpoint API para recibir códigos y convertirlos a letras
app.post("/api/code", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "El campo code es requerido" });
  }

  try {
    // Buscar la letra correspondiente al código
    const [rows] = await db.execute(
      "SELECT letter FROM alphabet WHERE code = ?",
      [code]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Código no encontrado" });
    }

    const letter = rows[0].letter;
    currentMessage += letter; // Agregar la letra al mensaje actual

    console.log(`Código recibido: ${code} -> Letra: ${letter}`);
    console.log(`Mensaje actual: ${currentMessage}`);

    res.json({
      success: true,
      letter: letter,
      currentMessage: currentMessage,
    });
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint para reiniciar el mensaje
app.post("/api/reset", (req, res) => {
  currentMessage = "";
  console.log("Mensaje reiniciado");

  res.json({
    success: true,
    message: "Mensaje reiniciado correctamente",
  });
});

// Endpoint para obtener el mensaje actual
app.get("/api/message", (req, res) => {
  res.json({
    message: currentMessage || "Esperando mensaje...",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(
    `Para enviar un código, haz POST a http://localhost:${PORT}/api/code`
  );
  console.log(`Para reiniciar, haz POST a http://localhost:${PORT}/api/reset`);
  console.log(`Ejemplo: {"code": "123-456-789-012-345-678"}`);
});
