const express = require("express");
const Jimp = require("jimp");
const upload = require("express-fileupload");
const resize = require("./resize");
let PORT = process.env.PORT || 3000

const app = express();
app.use(upload());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

app.get('/upsc', (req, res) => {
    res.sendFile(__dirname + "/client/UPSC.html");
});

app.get('/jee', (req, res) => {
    res.sendFile(__dirname + "/client/jee.html");
});


app.get('/neet', (req, res) => {
    res.sendFile(__dirname + "/client/neet.html");
});

app.post("/", async (req, res) => {
    if (req.files) {
        let height;
        let width;
        height = parseInt(req.body.height);
        width = parseInt(req.body.width);
        quality = parseInt(req.body.quality);
        format = req.body.format;

        let base64str = await resize(req.files.filename.data, height, width, quality, format);
        res.type(format);
        res.send(base64str);
    }
});
app.listen(PORT, () => {
    console.log("Server started")
});