const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { bucket } = require("../config/firebaseAdmin"); // adjust path

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToFirebase = async (files) => {
  if (!bucket) throw new Error("Firebase bucket is not initialized"); // ✅ check bucket
  if (!files || !files.length) return [];

  let urls = [];

  for (const file of files) {
    const fileName = `products/${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: { contentType: file.mimetype },
    });

    await new Promise((resolve, reject) => {
      stream.on("error", reject);

      stream.on("finish", async () => {
        try {
          await fileUpload.makePublic(); // make file public
          urls.push(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });

      stream.end(file.buffer);
    });
  }

  return urls;
};


module.exports = { upload, uploadToFirebase };
