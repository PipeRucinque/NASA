// Aqui se codifica la conexion con la base de datos de MongoDB Compass
// Para la conexión requiero el modulo de mongoose

const mongoose = require("mongoose")

module.exports = function () {
    mongoose.connect('mongodb://127.0.0.1:27017/NASA')
    .then(() => console.log("Conectado con MongoDB"))
    .catch(() => console.log("Error de conexión con MongoDB: ", err))
}