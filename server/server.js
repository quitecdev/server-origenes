require("./config/config");
var nodemailer = require("nodemailer");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//router.post('/email', EmailCtrl.sendEmail);

// app.post('/email', EmailCtrl.sendEmail);

app.post("/email", function(request, response) {
  let body = request.body;

  // Definimos el transporter
  let transporter = nodemailer.createTransport({
    host: "mail.quitec.com.ec",
    port: 25,
    secure: false, //true for 465 port, false for other ports
    auth: {
      user: "sysalert@quitec.com.ec",
      pass: "Systemquitec1_"
    }
  });

  // Definimos el email
  var mailOptions = {
    from: "SYSAlert Origentes",
    to: "info@origenesculinarios.org, info@quitec.com.ec",
    subject: "Asunto",
    html: ` 
    <dl>
    <dt><strong>Instituto</strong></dt>
    <dd>${body.instituto}</dd>

    <dt><strong>Página Web / Redes Sociales</strong></dt>
    <dd>${body.paginaWeb}</dd>

    <dt><strong>País</strong></dt>
    <dd>${body.pais}</dd>

    <dt><strong>Ciudad</strong></dt>
    <dd>${body.ciudad}</dd>

    <dt><strong>Dirección</strong></dt>
    <dd>${body.direccion}</dd>

    <dt><strong>Teléfono</strong></dt>
    <dd>${body.telefono}</dd>

    <dt><strong>Contacto</strong></dt>
    <dd>${body.contacto}</dd>

    <dt><strong>Email</strong></dt>
    <dd>${body.email}</dd>

    <dt><strong>Celular</strong></dt>
    <dd>${body.movil}</dd>

    <dt><strong>Observaciones</strong></dt>
    <dd>${body.mensaje}</dd>

    </dl>
  `
  };

  // Enviamos el email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      response.send(500, err.message);
    } else {
      console.log("Email sent");
      response.status(200).jsonp(req.body);
    }
  });

  response.send('Email enviado');

});

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
