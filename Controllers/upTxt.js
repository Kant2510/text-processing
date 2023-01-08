const axios = require('axios')

const upTxt = async (req, res) => {

    console.log(req.body)

    if (req.body.text === '')
        return res.send({ success: false, message: 'Text does not exist !' })

    const options = {
        method: 'POST',
        url: 'https://api.edenai.run/v2/text/keyword_extraction',
        headers: {
            authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWZiZmI3ZjYtZDBkMy00Y2U4LWJhNmQtNDQ2MDI4ZmNhMTIyIiwidHlwZSI6ImFwaV90b2tlbiJ9.i_e2nq604DUgpeDcqR_fm2qHHp6YDvhlAB8wJY7tP2E',
        },
        data: {
            providers: 'microsoft, amazon',
            text: req.body.text,
            language: req.body.lang,
        },
    }

    axios
        .request(options)
        .then((response) => {
            //console.log(response.data)
            console.log(response.data['eden-ai'].items)
            res.send({
                success: true,
                message: response.data['eden-ai'].items,
            })
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports = upTxt