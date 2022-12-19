// Aqui se debe crear los endpoints de consultas de la coleccion user

const express = require("express")
const router = express.Router()

const {User, validateUser} = require("../models/user.js")

// http://localhost:3000/api/users
router.get("/", async(req, res) => {
    if (req.query.email) {
        res.send(await User.find({email: req.query.email}))
    } else {
        res.send(await User.find({}))
    }
})
router.get("/:email", async(req, res) => {
    res.send(await User.find({email: req.params.email}).select("name email"))
})

router.post('/create', async(req, res) => {
    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const user = new User(req.body)
    res.send(await user.save())
    console.log("user creado");
})

router.put('/edit/:email', async(req, res) => {
    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    res.send(await User.findOneAndUpdate({email: req.params.email}, req.body, {new: true}))
    console.log("user editado");
})

router.delete('/delete/:email', async(req, res) => {
    res.send(await User.findOneAndDelete({email: req.params.email}))
    console.log("user eliminado");
})

module.exports = router



