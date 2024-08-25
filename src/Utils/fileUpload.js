const { once } = require("events");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const shortUUID = require("short-uuid");

const projectId = process.env.PROJECT_ID;
const JSON_FILE = process.env.GC_FILENAME;
const JsonKeyFileName = path.join(__dirname, JSON_FILE);
const bucketName = process.env.BUCKET_NAME;
const PUBLIC_URL = `https://storage.googleapis.com/`;

const storage = new Storage({
  projectId: projectId,
  keyFilename: JsonKeyFileName,
});

const bucket = storage.bucket(bucketName);

const fileUploadUtil = async (file, folder = "") => {
  const shortId = shortUUID.generate();
  const fileName = folder
    ? `${folder}/${shortId}${file.name}`
    : `${shortId}${file.name}`;

  let publicUrl = "";

  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype,
    predefinedAcl: "publicRead",
  });

  blobStream.on("error", (err) => {
    throw err;
  });

  blobStream.on("finish", () => {
    publicUrl = PUBLIC_URL + `${bucket.name}/${blob.name}`;
  });

  blobStream.end(file.data);
  await once(blobStream, "finish");

  return publicUrl;
};
module.exports = fileUploadUtil;
