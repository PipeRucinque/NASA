// Importo la coleccion de neas de la base de datos en MongoDB Compass

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

module.exports = Neas