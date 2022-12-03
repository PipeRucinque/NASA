// Aqui se debe crear los endpoints de consultas de la coleccion landing

const express = require("express")
const router = express.Router()

const Landing = require("../models/landing.js")

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
    res.send(await Landing.find({mass: req.params.mass}).select("name mass"))
})

router.get("/class/:recclass", async(req, res) => {
    const recclass = req.params.recclass.toUpperCase()
    res.send(await Landing.find({recclass: recclass}).select("name recclass"))
})

router.post('/create', async(req, res) => {
    const landing = new Landing(req.body)
    res.send(await landing.save())
})

router.put('/edit/:id', async(req, res) => {
    console.log(req.params.id);
    res.send(await Landing.findOneAndUpdate({id: req.params.id}, req.body, {new: true}))
})

router.delete('/delete/:id', async(req, res) => {
    console.log(req.params.id);
    res.send(await Landing.findOneAndDelete({id: req.params.id}))
})

module.exports = router