const dotenv = require('dotenv');

// va a hacer que lea del archivo y las guarde en las variables de entorno
dotenv.config({ path: './config.env' });

// requerir el código va a ir después porque primero queremos tener bien definidas las variables
const app = require(`${__dirname}/app.js`);

// detrás de escenas heroku le va a dar un puerto
const port = process.env.PORT || 3000;
// iniciamos el servidor - puerto en el que va a salir
app.listen(port, () => {
    //callback en cuanto se inicia
    console.log(`Server running on ${port}...`);
});
