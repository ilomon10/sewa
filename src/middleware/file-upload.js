const path = require('path');
const multer = require("multer");
const logger = require("../logger");
const { authenticate } = require('@feathersjs/express');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => {
    const originalname = file.originalname.split(".");
    return cb(null, `${Date.now()}-${originalname[0].replace(/ /g, "_")}.${originalname[1]}`)
  },
})

const upload = multer({
  storage,
  fileFilter: function (_req, file, callback) {
    var ext = path.extname(file.originalname);
    let allowExt = [".png", ".jpg", ".gif", ".jpeg"];
    if (allowExt.indexOf(ext) === -1) {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
  limits: {
    fieldSize: 500000,
    fieldSize: 2e+6
  }
})

module.exports = () => [
  function allowAnonym(req, res, next) {
    const { method } = req;
    if (method !== "POST" || method !== "PATH") {
      if (!req.authentication)
        req.authentication = {
          strategy: "anonymous"
        }
    }
    next();
  },
  authenticate("jwt", "anonymous"),
  upload.single("uri"),
  function fileUpload(req, res, next) {
    const { method } = req;
    if (method === "POST" || method === "PATH") {
      let file = req.file;
      req.feathers.file = file;
      let body = {
        description: req.body.description,
        filename: file.originalname,
        path: file.path
      }
      req.body = body;
    }
    next();
  }
];
