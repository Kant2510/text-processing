const express = require('express')
const router = express.Router()
const upTxt = require('../Controllers/upTxt')

const uploadText = () => {
    router.post('/', async (req, res) => { upTxt(req, res) })
    return router
}

module.exports = uploadText