const express = require('express')
const router = express.Router()
const upImg = require('../Controllers/upImg')

const uploadImage = () => {
    router.post('/', async (req, res) => { upImg(req, res) })
    return router
}

module.exports = uploadImage