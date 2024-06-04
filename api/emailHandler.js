// Importar las bibliotecas necesarias
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Configurar el servidor Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar los datos del formulario y enviar el correo electrónico
app.post('/api/contacto', (req, res) => {
  const { name, email, affair, message } = req.body;

  // Configurar el transporter de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'stiven2201@gmail.com',
      pass: '1006011887js2203'
    }
  });

  // Configurar el correo electrónico
  const mailOptions = {
    from: email,
    to: 'stiven2201@gmail.com',
    subject: affair,
    text: `${name} ha enviado un mensaje desde tu sitio web.\n\nCorreo electrónico: ${email}\n\nMensaje: ${message}`
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo electrónico.');
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      res.status(200).send('Correo electrónico enviado correctamente.');
    }
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
