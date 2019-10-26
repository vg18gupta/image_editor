const Jimp = require("jimp");
module.exports = async function resize(buffer, height, width, quality, format) {
    let base64str;
    await Jimp.read(buffer)
        .then(async image => {
            if (height > 2000 || width > 2000 || quality > 100) {
                await image.getBase64(format, (err, base64) => {
                    base64str = base64;
                })
            } else {
                if (height && width) {
                    image.resize(height, width);
                }
                if (quality){
                    image.quality(quality);
                }
                await image.getBase64(format, (err, base64) => {
                    base64str = base64;
                })
            }
        })
        .catch(err => {
            throw err;
        });
    return base64str;
}