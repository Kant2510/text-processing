const Tesseract = require("tesseract.js")
const express = require("express")
const axios = require("axios")
const fileUpload = require("express-fileupload")
const path = require("path")
const app = express()

app.use("/public/", express.static("./public"))
app.use("/views/", express.static("./views"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

app.get("/", (req, res) => {
    res.render("upload.ejs")
})

app.post("/upload-image", async (req, res) => {
    console.log(req.files)
    if (req.files === null)
        return res.send({
            success: false,
            message: "Please upload an image !",
        })
    const { image } = req.files
    const filePath = path.join(__dirname, "public", image.name)
    image
        .mv(filePath)
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
})
app.post("/upload-text", (req, res) => {
    console.log(req.body)
    if (req.body.text === "")
        return res.send({ success: false, message: "Text does not exist !" })
    const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/text/keyword_extraction",
        headers: {
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWZiZmI3ZjYtZDBkMy00Y2U4LWJhNmQtNDQ2MDI4ZmNhMTIyIiwidHlwZSI6ImFwaV90b2tlbiJ9.i_e2nq604DUgpeDcqR_fm2qHHp6YDvhlAB8wJY7tP2E",
        },
        data: {
            providers: "microsoft, amazon",
            text: req.body.text,
            language: req.body.lang,
        },
    }

    axios
        .request(options)
        .then((response) => {
            //console.log(response.data)
            console.log(response.data["eden-ai"].items)
            res.send({
                success: true,
                message: response.data["eden-ai"].items,
            })
        })
        .catch((error) => {
            console.error(error)
        })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
