// EN este archivo codifico el servidor para poder hacer queries a traves de endpoints
// Modulo de Express levanta los servidores
// Aqui se conectara con todas las rutas (routes) 

// ruta que entrega dashboard.render.com: https://nasa-j6wi.onrender.com/ping

require('dotenv').config()

const cors = require("cors") 
const express = require("express")
const app = express()
app.use(cors())
app.use(express.json())

const connection = require("./connection.js")
connection()

const landingRoutes = require("./routes/landingRouter.js")
app.use("/api/astronomy/landings", landingRoutes)

const neasRoutes = require("./routes/neasRouter.js")
app.use("/api/astronomy/neas", neasRoutes)

const userRoutes = require("./routes/userRouter.js")
app.use("/api/users", userRoutes)

app.get("/ping", (req, res) => {
    res.send("pong")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
})