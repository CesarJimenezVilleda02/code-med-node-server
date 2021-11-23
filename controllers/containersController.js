const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const credentials = require(`${__dirname}/med-code-iot-firebase-adminsdk-okkub-1a9094ffc2.json`);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://med-code-iot-b579d-default-rtdb.firebaseio.com/',
});

const db = admin.database();

const containersRef = db.ref('contenedores');

// Se usa para obtener todos los contenedores
exports.getAllContainers = (req, res) => {
    // En la referencia pedimos todos los contenedores
    containersRef.once('value', (snap) => {
        // devolvemos una respuesta exitosa con los datos
        res.status(200).json({
            status: 'Success',
            message: 'All containers were successfully retrieved',
            data: snap.val(),
        });
    });
};

// Se usa la primera vez que se enciende un contenedor
exports.postContainer = (req, res) => {
    // Creamos el contenedor con los datos del request
    const newContainer = {
        ...req.body,
        inicio: Date.now(),
    };

    // añadimos el contenedor con push para que tenga un id único
    const generatedKey = containersRef.push(newContainer).key;

    // ya creado devolvemos una respuesta exitosa
    res.status(200).json({
        status: 'success',
        message: 'The container was added successfully',
        id: generatedKey,
    });
};

// Se usa para obtener la información d eun contenedor a partir de su información
exports.getContainerInfo = async (req, res) => {
    // obtenemos la referencia al hijo usando el parámetro de la url
    const oneContainer = containersRef.child(req.params.id);

    oneContainer.once('value', (snap) => {
        const information = snap.val();
        if (information) {
            // devolvemos una respuesta exitosa con los datos
            res.status(200).json({
                status: 'success',
                message: 'All containers retrieved successfully',
                data: snap.val(),
            });
        } else {
            res.status(404).json({
                // devolvemos una respuesta fallida
                status: 'failed',
                message: 'The container you were looking for was not found',
            });
        }
    });
};

// Se usa para subir una fecha
exports.postRead = (req, res) => {
    // añadimos nueva lectura al contenedor
    console.log(req);
    containersRef
        .child(req.params.id)
        .child('lecturas')
        .push({
            ...req.body,
            fecha: Date.now(),
        });
    res.status(200).json({
        status: 'success',
        message: 'New date successfully uploaded',
    });
};

// Se usa para obtener todas las lecturas del sensor
exports.getAllReads = (req, res) => {
    // obtenemos la referencia al arreglo de lecturas
    const oneContainerReads = containersRef.child(req.params.id).child('lecturas');
    oneContainerReads.once('value', (snap) => {
        const reads = snap.val();
        if (reads) {
            // devolvemos una resouesta exitosa con los datos
            res.status(200).json({
                status: 'success',
                message: 'All reads retrieved successfully',
                data: reads,
            });
        } else {
            // devolvemos una respuesta fallida
            res.status(404).json({
                status: 'failed',
                message: 'The reads could not be retrieved',
            });
        }
    });
};

// Se usa para obtener la última fecha añadida
exports.getLastRead = (req, res) => {
    containersRef
        .child(req.params.id)
        .child('lecturas')
        .limitToLast(1)
        .once('value', (snap) => {
            res.status(200).json({
                status: 'success',
                message: 'The last read was successfully retrieved',
                data: snap.val(),
            });
        });
};
