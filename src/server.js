const http = require('http');
const url = require('url');
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

  console.dir(parsedUrl.pathname);
  console.dir(req.method);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](req, res);
  } else {
    urlStruct.notFound(req, res);
    // console.log('Resource not found');
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);
