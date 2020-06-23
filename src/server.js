const express = require('express')
const server = express()
const studentsRoutes = require("./users/index")

server.use("/students", studentsRoutes)

server.listen(3001, () => {

})
