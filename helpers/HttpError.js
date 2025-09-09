const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message) => {
  const msg = message ?? messageList[status] ?? "Error";
  const err = new Error(msg);
  err.status = status;
  err.name = "HttpError";
  return err;
};

module.exports = HttpError;
