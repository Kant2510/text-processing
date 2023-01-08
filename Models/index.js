const Tesseract = require('tesseract.js')
const axios = require('axios')

//model cho keyword extraction
const extract = async req => {
    const options = {
        method: 'POST',
        url: 'https://api.edenai.run/v2/text/keyword_extraction',
        headers: {
            authorization:
                'Bearer <YOUR EDEN AI API KEY>',
        },
        data: {
            providers: 'microsoft, amazon',
            text: req.body.text,
            language: req.body.lang,
        },
    }

    try {
        const response = await axios.request(options)

        console.log(response.data['eden-ai'].items)

        return {
            success: true,
            message: response.data['eden-ai'].items
        }
    }
    catch (err) {
        return {
            success: false,
            message: err
        }
    }
}

//model cho ocr
const recog = async (req, filePath) => {
    try {
        const response = await Tesseract.recognize(filePath, req.body.lang, {})

        console.log(response.data.text)

        return {
            success: true,
            message: response.data.text
        }
    }
    catch (err) {
        return {
            success: false,
            message: err
        }
    }
}
module.exports = {
    extraction: extract,
    recognition: recog
}
