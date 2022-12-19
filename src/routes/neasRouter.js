// Aqui se debe crear los endpoints de consultas de la coleccion neas

const express = require("express")
const router = express.Router()

const {Neas, validateNeas} = require("../models/neas.js")

// http://localhost:3000/api/astronomy/neas
router.get("/", async(req, res) => {
    if(req.query.class) {
        const reqQuery = req.query.class
        const orbitClass = reqQuery.charAt(0).toUpperCase() + reqQuery.slice(1)
        res.send(await Neas.find({orbit_class: orbitClass}))
    } else if(req.query.from && req.query.to) {
        res.send(await Neas.find({discovery_date: {$gte: req.query.from, $lte: req.query.to}}).select("designation discovery_date period_yr"))
    } else if(req.query.from){
        res.send(await Neas.find({discovery_date: {$gte: req.query.from}}).select("designation discovery_date period_yr"))
    } else if(req.query.to){
        res.send(await Neas.find({discovery_date: {$lte: req.query.to}}).select("designation discovery_date period_yr"))
    } else {
        res.send(await Neas.find({}))
    }
})

router.get("/id/:id", async(req, res) => {
    console.log(req.params.id);
    res.send(await Neas.findById({_id: req.params.id}))
})
router.get("/designation/:designation", async(req, res) => {
    console.log(req.params);
    const designationRP = req.params.designation.replaceAll("-", " ")
    res.send(await Neas.find({designation: designationRP}))
})

router.post('/create', async(req, res) => {
    const {error} = validateNeas(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const neas = new Neas(req.body)
    res.send(await neas.save())
})

router.put('/edit/:designation', async(req, res) => {
    const {error} = validateNeas(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const designationRP = req.params.designation.replaceAll("-", " ")
    res.send(await Neas.findOneAndUpdate({designation: designationRP}, req.body, {new: true}))
})

router.delete('/delete/:designation', async(req, res) => {
    const designationRP = req.params.designation.replaceAll("-", " ")
    res.send(await Neas.findOneAndDelete({designation: designationRP}))
})

module.exports = router