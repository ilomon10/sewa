// Initializes the `media` service on path `/media`
const { Media } = require('./media.class');
const createModel = require('../../models/media.model');
const logger = require("../../logger");
const hooks = require('./media.hooks');
const path = require('path');
const multer = require("multer");

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
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  },
  limits: {
    fieldSize: 500000,
    fieldSize: 2e+6
  }
})

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use(
    '/media',
    upload.array("files"),
    (req, _res, next) => {
      const { method } = req;
      if (method === "POST" || method === "PATCH") {
        req.feathers.files = req.files;
        const body = [];
        for (const file of req.files) {
          body.push({
            description: req.body.description,
            filename: file.originalname,
            path: file.path
          });
        }
        req.body = method === 'POST' ? body : body[0];
      }
      next();
    },
    new Media(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('media');

  service.hooks(hooks);
};
