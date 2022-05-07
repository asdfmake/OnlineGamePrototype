const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors({origin: "*"}))

const http = require("http").createServer(app)
http.listen(80, ()=>{console.log("listening on 80")})

const io = require("socket.io")(http, {cors: {origin: "*"}})
module.exports = io;
require("./OnlineControler.js")