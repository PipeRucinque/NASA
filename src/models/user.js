const Joi = require("joi")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    nickname: {type: String, required: false},
    email: {type: String, required: false},
    picture: {type: String, required: false},
    affiliatedNumber: {type: Number, required: true, unique: true},
    affiliationDate: {type: Date, required: false},
    occupation: {type: String, required: false},
    birthdate: {type: Date, required: false},
    neasDiscovered: [{type: mongoose.Schema.Types.ObjectId, ref: 'Neas'}]
})

const User = mongoose.model("User", userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        nickname: Joi.string(),
        email: Joi.string(),
        picture: Joi.string(),
        affiliatedNumber: Joi.number().required().unique(),
        affiliationDate: Joi.date(),
        occupation: Joi.string(),
        birthdate: Joi.date(),
        neasDiscovered: Joi.array() //[{type: mongoose.Schema.Types.ObjectId, ref: 'Neas'}]
    })    
}

module.exports.User = User
module.exports.validateUser = validateUser