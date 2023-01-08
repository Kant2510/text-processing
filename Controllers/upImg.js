const Tesseract = require('tesseract.js')
const path = require('path')

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
        .then((success) => {
            console.log(success)
        })
        .catch((err) => {
            console.log(err)
        })
    Tesseract.recognize(filePath, req.body.lang, {})
        .then(({ data: { text } }) => {
            console.log(text)
            res.send({ success: true, message: text })
        })
        .catch((err) => {
            return res.send(err)
        })
}

module.exports = upImg