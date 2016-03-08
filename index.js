var _ require('lodash');
var ecstatic require('ecstatic');
var express require('express');
var fs require('fs');
var path require('path');

function prototypeServer (options) {
  var app = express();

  /**
   * TEMPLATES
   */
  app.set('view engine', 'ejs');
  app.set('views', options.views);
  // make lodash available to templates
  app.locals._ = _;

  // read template data json file
  function getData () {
    return JSON.parse(fs.readFileSync(`${options.data}/data.json`, 'utf8'));
  }

  /**
   * ROUTES
   */
  app.get('/', function (req, res) {
    res.render('pages/index', {data: getData()});
  });

  app.get('/api', function (req, res) {
    res.json(getData());
  });

  // auto render if view with the same name as url exists
  app.use(function (req, res, next) {
    var file = req.path.toLowerCase().substring(1).replace(/\/$/, '');
    var filePath = path.resolve(`${options.views}/pages/${file}.ejs`);
    var dirPath = path.resolve(`${options.views}/pages/${file}/index.ejs`);

    if (fs.existsSync(dirPath)) {
      return res.status(200).render(`pages/${file}/index`, {data: getData()});
    }
    if (fs.existsSync(filePath)) {
      return res.status(200).render(`pages/${file}`, {data: getData()});
    }
    next();
  });

  /**
   * STATIC FILES
   */
  app.use(ecstatic({root: options.public}));

  return app;
}

module.exports = prototypeServer;
