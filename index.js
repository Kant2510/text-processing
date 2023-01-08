const express = require('express')
const fileUpload = require('express-fileupload')
const uploadImage = require('./Routers/uploadImage')
const uploadText = require('./Routers/uploadText')

const app = express()

app.use('/public/', express.static('./public'))
app.use('/views/', express.static('./views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('upload.ejs')
})

app.use('/upload-image', uploadImage())
app.use('/upload-text', uploadText())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
