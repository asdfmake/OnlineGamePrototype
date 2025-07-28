const express = require("express")
const app = express()
app.use(express.json())
const path = require("path")

const cors = require("cors")
app.use(cors({origin: "*"}))

const http = require("http").createServer(app)
http.listen(80, ()=>{console.log("listening on 80")})

app.use((req, res, next) => {
    if (decodeURIComponent(req.url).startsWith("/backend za igricu")) {
        return res.status(403).send("Access denied.");
    }
    next();
});

app.get("/", (req, res) => {
    if(req.url === "/") {
        res.sendFile(path.join(__dirname, "..", "index.html"))
    }
    app.use(express.static(path.join(__dirname, "..")))

})

const io = require("socket.io")(http, {cors: {origin: "*"}})
module.exports = io;
require("./OnlineControler.js")