// Aqui se debe crear los endpoints de consultas de la coleccion landing

const express = require("express")
const router = express.Router()

const {Landing, validateLanding} = require("../models/landing.js")

// http://localhost:3000/api/astronomy/landings
router.get("/", async(req, res) => {
    if(req.query.minimum_mass) {
        return res.send(await Landing.find({mass: {$gte: req.query.minimum_mass}}).select("name mass"))
    } else if(req.query.from && req.query.to) {
        res.send(await Landing.find({$and: [{fall: "Fell"}, {year: {$gte: req.query.from, $lte: req.query.to}}]}).select("name mass year"))
    } else if(req.query.from){
        res.send(await Landing.find({$and: [{fall: "Fell"}, {year: {$gte: req.query.from}}]}).select("name mass year"))
    } else if(req.query.to){
        res.send(await Landing.find({$and: [{fall: "Fell"}, {year: {$lte: req.query.to}}]}).select("name mass year"))
    } else {
        res.send(await Landing.find({}))
    }
})

router.get("/:id", async(req, res) => {
    res.send(await Landing.find({id: req.params.id}))
})

router.get("/mass/:mass", async(req, res) => {
    res.send(await Landing.find({mass: req.params.mass}).select("name mass geolocation"))
})

router.get("/class/:recclass", async(req, res) => {
    const recclass = req.params.recclass.toUpperCase()
    res.send(await Landing.find({recclass: recclass}).select("name recclass geolocation"))
})

router.post('/create', async(req, res) => {
    const {error} = validateLanding(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const landing = new Landing(req.body)
    res.send(await landing.save())
})

router.put('/edit/:id', async(req, res) => {
    const {error} = validateLanding(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    console.log(req.params.id);
    res.send(await Landing.findOneAndUpdate({id: req.params.id}, req.body, {new: true}))
})

router.delete('/delete/:id', async(req, res) => {
    console.log(req.params.id);
    res.send(await Landing.findOneAndDelete({id: req.params.id}))
})

module.exports = router