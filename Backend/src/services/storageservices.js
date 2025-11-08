const Imagekit = require("imagekit");

const imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) {
    // Convert buffer to base64
    const base64File = file.buffer.toString('base64');
    
    const result = await imagekit.upload({
        file: base64File,
        fileName: fileName,
        useUniqueFileName: true
    });
    return result;
}

module.exports = {
    uploadFile
}