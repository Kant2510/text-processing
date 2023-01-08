const path = require('path')
const { recognition } = require('../Models/index.js')

const upImg = async (req, res) => {

    console.log(req.files)

    if (req.files === null)
        return res.send({
            success: false,
            message: 'Please upload an image !',
        })
    const { image } = req.files
    const filePath = path.join(__dirname, '../public', image.name)

    image.mv(filePath)

    res.send(await recognition(req, filePath))
}

module.exports = upImg