require("./config/config");
const nodemailer = require("nodemailer");
const empty = require('is-empty');
const cors = require('cors')

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors())

app.post("/email", function(request, response) {

  if(empty(request.body)){
    response.status(400).send("Revise todos los campos")
    return;
  }

  let body = request.body;
  // Definimos el transporter
  let transporter = nodemailer.createTransport({
    host: "mail.quitec.com.ec",
    port: 25,
    secure: false,
    auth: {
      user: "sysalert@quitec.com.ec",
      pass: "Systemquitec1_"
    }
  });

  // Definimos el email
  var mailOptions = {
    from: 'SYSAlert Quitec <sysalert@quitec.com.ec>',
    to: "datacenter@quitec.com.ec",
    subject: "Registro Origenes",
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

  transporter.sendMail(mailOptions, function(err, info) {
    if (err){
      response.sendStatus(400).send("No se ha podido enviar el registro.")
      return;
    }
    response.sendStatus(200).send("Se ha enviar el registro correctamente.")
  });
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
