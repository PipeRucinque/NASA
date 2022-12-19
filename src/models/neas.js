// Importo la coleccion de neas de la base de datos en MongoDB Compass

const Joi = require("joi")
const mongoose = require("mongoose")

const neasSchema = new mongoose.Schema({
    designation: String,
    discovery_date: String,
    h_mag: Number,
    moid_au: Number,
    q_au_1: Number,
    q_au_2: Number,
    period_yr: Number,
    i_deg: Number,
    pha: String,
    orbit_class: String
})

const Neas = mongoose.model("Neas", neasSchema)

function validateNeas(neas) {
    const schema = Joi.object({
        designation: Joi.string(),
        discovery_date: Joi.string(),
        h_mag: Joi.number(),
        moid_au: Joi.number(),
        q_au_1: Joi.number(),
        q_au_2: Joi.number(),
        period_yr: Joi.number(),
        i_deg: Joi.number(),
        pha: Joi.string(),
        orbit_class: Joi.string()
    })
    return schema.validate(neas)
}


module.exports.Neas = Neas
module.exports.validateNeas = validateNeas