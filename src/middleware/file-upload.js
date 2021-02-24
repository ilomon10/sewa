const path = require('path');
const multer = require("multer");
const { authenticate } = require('@feathersjs/express');
const crypto = require("crypto");
const logger = require("../logger");

var sha512 = function (password, salt) {
  var hash = crypto.createHmac('sha1', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return value;
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => {
    var ext = path.extname(file.originalname);
    return cb(null, `${sha512(file.originalname, Date.now().toString())}${ext}`)
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
    // fieldSize: 2e+6
  }
})

module.exports = () => [
  function allowAnonym(req, res, next) {
    const { method } = req;
    if (["POST", "PUT"].indexOf(method) === -1) {
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
    if (["POST", "PUT"].indexOf(method) !== -1) {
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
