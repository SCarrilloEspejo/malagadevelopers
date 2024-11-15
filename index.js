const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const emailService = require('./emailService');

const app = express();
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Email API',
      version: '1.0.0',
      description: 'API para enviar correos electrónicos',
    },
    servers: [
      {
        url: 'malagadevelopers-ded6f7bcgvggd5dd.canadacentral-01.azurewebsites.net',
      },
    ],
  },
  apis: ['./index.js'],
};
/*   swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Email API',
      version: '1.0.0',
      description: 'API para enviar correos electrónicos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'],
}; */
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /send-email:
 *   post:
 *     summary: Envía un correo electrónico
 *     description: Envía un correo electrónico a una dirección específica con el asunto y mensaje proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: Dirección de correo del destinatario
 *                 example: "destinatario@example.com"
 *               subject:
 *                 type: string
 *                 description: Asunto del correo
 *                 example: "Bienvenido a nuestra plataforma"
 *               message:
 *                 type: string
 *                 description: Cuerpo del mensaje
 *                 example: "Gracias por registrarte en nuestra plataforma."
 *     responses:
 *       200:
 *         description: Correo enviado con éxito
 *       500:
 *         description: Error al enviar el correo
 */
app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const response = await emailService.sendMail({ to, subject, message });
    res.status(200).json({ message: 'Correo enviado con éxito', details: response.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el correo', details: error.message });
  }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
