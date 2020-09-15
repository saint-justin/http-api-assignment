const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');
const jsonHandler = require('./jsonHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const urlStruct = {
  '/': htmlHandler.getClient,
  '/style.css': htmlHandler.getStyle,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.missing,
};

const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const params = query.parse(parsedUrl.query);
  const type = req.headers.accept.split(',')[0] || 'application/json';
  // console.log(`TYPE: ${type}`);
  // console.dir(parsedUrl.pathname);
  // console.dir(req.method);

  if (urlStruct[parsedUrl.pathname] && type) {
    urlStruct[parsedUrl.pathname](req, res, params, type);
  } else if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](req, res, params);
  } else {
    urlStruct.notFound(req, res);
  }
};

http.createServer(onRequest).listen(port);
// console.log(`Listening on 127.0.0.1:${port}`);
