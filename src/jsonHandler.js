const respondJSON = (req, res, status, object, type) => {
  const headerType = type || 'application/json';
  res.writeHead(status, { 'Content-Type': headerType });
  res.write(JSON.stringify(object));
  res.end();
};

const success = (req, res, params, type) => {
  const obj = {
    id: 'success',
    message: 'Request successful',
  };
  respondJSON(req, res, 200, obj, type);
};

const badRequest = (req, res, params, type) => {
  const obj = {
    id: 'badRequest',
    message: 'Missing valid query param set to true',
  };

  if (params.valid === 'yes') obj.message = 'This request has the required params';
  // console.log(`PARAMS VALID? ${params.valid}`);

  respondJSON(req, res, 400, obj, type);
};

const unauthorized = (req, res, params, type) => {
  const obj = {
    id: 'unauthorized',
    message: 'Missing loggedIn query param set to "yes"',
  };

  if (params.loggedIn === 'yes') obj.message = 'Yay you viewed the content';
  respondJSON(req, res, 401, obj, type);
};

const forbidden = (req, res, params, type) => {
  const obj = {
    id: 'forbidden',
    message: 'You do not have access to this content.',
  };

  respondJSON(req, res, 403, obj, type);
};

const internal = (req, res, params, type) => {
  const obj = {
    id: 'internalError',
    message: 'Internal server error. Something went wrong.',
  };
  respondJSON(req, res, 500, obj, type);
};

const notImplemented = (req, res, params, type) => {
  const obj = {
    id: 'notImplemented',
    message: 'Feature not yet implemented. Check again later for updated content.',
  };
  respondJSON(req, res, 501, obj, type);
};

const missing = (req, res, params, type) => {
  const obj = {
    id: 'missing',
    message: 'Requested information not found.',
  };
  respondJSON(req, res, 404, obj, type);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  missing,
};
