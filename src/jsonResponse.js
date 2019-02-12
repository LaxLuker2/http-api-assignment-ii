const users = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    "Content-Type": "application/json"
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    "Content-Type": "application/json"
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    users
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// get meta info about user object
// should calculate a 200
const getUsersMeta = (request, response) => {
  //return 200 without message, just the meta data
  return respondJSONMeta(request, response, 200);
};

// function just to update our object
const updateUser = (request, response) => {
  // change to make to user
  // This is just a dummy object for example
  const newUser = {
    createdAt: Date.now()
  };

  // modifying our dummy object
  // just indexing by time for now
  users[newUser.createdAt] = newUser;

  // return a 201 created status
  return respondJSON(request, response, 201, newUser);
};

// function for 404 not found requests with message
const getNotFound = (request, response) => {
  // create error message for response
  const respondNotFound = {
    message: "The page you are looking for was not found.",
    id: "notFound"
  };

  const notFoundString = JSON.stringify(respondNotFound);

  // return a 404 with an error messagenotFound
  return respondJSON(request, response, 404, notFoundString);
};

const getSuccess = (request, response) => {
  // json message for response
  const responseSucess = {
    message: "This is a successful response"
  };

  const responseSucessString = JSON.stringify(responseSucess);

  // return 200 with message
  return respondJSON(request, response, 200, responseSucessString);
};

const getBadRequest = (request, response, params) => {
  // json message to send
  const responseBadRequest = {
    message: "This request has the required parameters"
  };

  let statusCode = 200;
  let responseBadRequestString = JSON.stringify(responseBadRequest);

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== "true") {
    // set our error message
    responseBadRequest.message = "Missing valid query parameter set to true";
    // give the error a consistent id
    responseBadRequest.id = "badRequest";

    responseBadRequestString = JSON.stringify(responseBadRequest);
    statusCode = 400;
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, statusCode, responseBadRequestString);
};

const getUnauthorized = (request, response, params) => {
  // json message to send
  const respondUnauthorized = {
    message: "This request has the required parameters"
  };

  let statusCode = 200;
  let responseUnauthorizedString = JSON.stringify(respondUnauthorized);

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== "yes") {
    // set our error message
    respondUnauthorized.message = "Missing loggedIn query parameter set to yes";
    // give the error a consistent id
    respondUnauthorized.id = "Unauthorized";

    responseUnauthorizedString = JSON.stringify(respondUnauthorized);
    statusCode = 401;
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, statusCode, responseUnauthorizedString);
};

const getForbidden = (request, response) => {
  // json message for response
  const respondForbidden = {
    message: "You do not have access to this content",
    id: "Forbidden"
  };

  const forbiddenString = JSON.stringify(respondForbidden);

  // return 403 with message
  return respondJSON(request, response, 403, forbiddenString);
};

const getInternal = (request, response) => {
  // json message for response
  const respondInternal = {
    message: "Internal Server Error. Something went wrong",
    id: "InternalError"
  };

  const internalString = JSON.stringify(respondInternal);

  // return 500 with message
  return respondJSON(request, response, 500, internalString);
};

const getNotImplemented = (request, response) => {
  // json message for response
  const respondNotImplemented = {
    message:
      "A get request for this page has not been implemented yet. Check again later for updated content",
    id: "notImplemented"
  };

  const notImplementedString = JSON.stringify(respondNotImplemented);

  // return 501 with message
  return respondJSON(request, response, 501, notImplementedString);
};

// set public modules
module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  getNotFound,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented
};
