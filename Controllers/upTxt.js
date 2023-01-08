const { extraction } = require('../Models/index.js')

const upTxt = async (req, res) => {

    console.log(req.body)

    if (req.body.text === '')
        return res.send({
            success: false,
            message: 'Text does not exist !'
        })

    res.send(await extraction(req))
}

module.exports = upTxt