const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Variable para almacenar el mensaje actual
let currentMessage = "Esperando mensaje...";

// Servir archivos estáticos
app.use(express.static("public"));

// Endpoint API para recibir mensajes
app.post("/api/message", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "El campo message es requerido" });
  }

  currentMessage = message;
  console.log("Mensaje recibido:", message);

  res.json({
    success: true,
    message: "Mensaje actualizado correctamente",
    receivedMessage: message,
  });
});

// Endpoint para obtener el mensaje actual
app.get("/api/message", (req, res) => {
  res.json({ message: currentMessage });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(
    `Para enviar un mensaje, haz POST a http://localhost:${PORT}/api/message`
  );
  console.log(`Ejemplo: {"message": "Tu texto aquí"}`);
});
