const express = require("express")
const router = express.Router()
const fs = require('fs')
const path = require('path')
const uniqid = require('uniqid')

//url: localhost:3001/students/

const studentsPath = path.join(__dirname, "students.json")

router.get('/', (req, res) => {

    const fileContentBuff = fs.readFileSync(studentsPath)
    const fileContent = (fileContentBuff.toString())

    res.send(JSON.parse(fileContent))
})

router.get("/:id", (req, res) => {

    const fileContentBuff = fs.readFileSync(studentsPath)
    const studentsArray = JSON.parse(fileContentBuff.toString())
    const student = studentsArray.filter((student) => student.id === req.params.id)

    res.send(student)
})

router.post("/", (req, res) => {

    const newStudent = { ...req.body, id: uniqid() }
    const fileContentBuff = fs.readFileSync(studentsPath)
    const studentsArray = JSON.parse(fileContentBuff.toString())

    studentsArray.push(newStudent)

    fs.writeFileSync(studentsPath, JSON.stringify(studentsArray))

    res.status(201).send(newStudent)
})

module.exports = router