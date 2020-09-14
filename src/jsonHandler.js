const respondJSON = (req, res, status, object) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(object));
  res.end();
};

const success = (req, res) => {
  const obj = {
    message: 'Request successful',
  };
  respondJSON(req, res, 200, obj);
};

const badRequest = (req, res) => {
  const obj = {
    message: 'Missing parameter value',
  };
  respondJSON(req, res, 400, obj);
};

const unauthorized = (req, res) => {
  const obj = {
    message: 'Requesting user unauthorized',
  };
  respondJSON(req, res, 401, obj);
};

const forbidden = (req, res) => {
  const obj = {
    message: 'Request forbidden',
  };
  respondJSON(req, res, 403, obj);
};

const internal = (req, res) => {
  const obj = {
    message: 'Internal server error.',
  };
  respondJSON(req, res, 500, obj);
};

const notImplemented = (req, res) => {
  const obj = {
    message: 'Feature not yet implemented.',
  };
  respondJSON(req, res, 501, obj);
};

const missing = (req, res) => {
  const obj = {
    message: 'Requested information not found.',
  };
  respondJSON(req, res, 404, obj);
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
