// Importo la coleccion de landing de la base de datos en MongoDB Compass

const mongoose = require("mongoose")
const Joi = require("joi")
const { required } = require("joi")

const landingSchema = new mongoose.Schema({
    name: String,
    id: Number,
    nametype: String,
    recclass: String,
    mass: Number,
    fall: String,
    year: String,
    reclat: Number,
    reclong: Number,
    geolocation: {
        latitude: Number,
        longitude: Number
    }
})

const Landing = mongoose.model("Landing", landingSchema)

function validateLanding(landing) {
    const schema = Joi.object({
        name: Joi.string().required(),
        id: Joi.number(),
        nametype: Joi.string(),
        recclass: Joi.string(),
        mass: Joi.number().required(),
        fall: Joi.string(),
        year: Joi.string(),
        reclat: Joi.number(),
        reclong: Joi.number(),
        geolocation: {
            latitude: Joi.number(),
            longitude: Joi.number()
        }
    })
    return schema.validate(landing)  
}

module.exports.Landing = Landing;
module.exports.validateLanding = validateLanding