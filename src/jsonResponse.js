const users = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(object);
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  // json object to send
  const responseGetUsersJSON = {
    users,
  };

  const responseGetUsers = JSON.stringify(responseGetUsersJSON);

  // return 200 with message
  return respondJSON(request, response, 200, responseGetUsers);
};

// get meta info about user object
// should calculate a 200
// return 200 without message, just the meta data
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// function to add a user from a POST body
const addUser = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'Name and age are both required',
  };

  // check to make sure we have both fields
  // We might want more validation than just checking if they exist
  // This could easily be abused with invalid types (such as booleans, numbers, etc)
  // If either are missing, send back an error message as a 400 badRequest
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    const responseAddUsersString = JSON.stringify(responseJSON);
    return respondJSON(request, response, 400, responseAddUsersString);
  }

  // default status code to 201 created
  let responseCode = 201;

  // if that user's name already exists in our object
  // then switch to a 204 updated status
  if (users[body.name]) {
    // update
    users[body.name].age = body.age;
    responseCode = 204;
  } else {
    // otherwise create an object with that name
    users[body.name] = {};
  }

  // add or update fields for this user name
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    const responseAddUsersString = JSON.stringify(responseJSON);
    return respondJSON(request, response, responseCode, responseAddUsersString);
  }
  // 204 has an empty payload, just a success
  // It cannot have a body, so we just send a 204 without a message
  // 204 will not alter the browser in any way!!!
  return respondJSONMeta(request, response, responseCode);
};

// function for 404 not found requests with message
const getNotFound = (request, response) => {
  // create error message for response
  const respondNotFound = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  const notFoundString = JSON.stringify(respondNotFound);

  // return a 404 with an error messagenotFound
  return respondJSON(request, response, 404, notFoundString);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

const getSuccess = (request, response) => {
  // json message for response
  const responseSucess = {
    message: 'This is a successful response',
  };

  const responseSucessString = JSON.stringify(responseSucess);

  // return 200 with message
  return respondJSON(request, response, 200, responseSucessString);
};

const getBadRequest = (request, response, params) => {
  // json message to send
  const responseBadRequest = {
    message: 'This request has the required parameters',
  };

  let statusCode = 200;
  let responseBadRequestString = JSON.stringify(responseBadRequest);

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseBadRequest.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseBadRequest.id = 'badRequest';

    responseBadRequestString = JSON.stringify(responseBadRequest);
    statusCode = 400;
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, statusCode, responseBadRequestString);
};

const getUnauthorized = (request, response, params) => {
  // json message to send
  const respondUnauthorized = {
    message: 'This request has the required parameters',
  };

  let statusCode = 200;
  let responseUnauthorizedString = JSON.stringify(respondUnauthorized);

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    respondUnauthorized.message = 'Missing loggedIn query parameter set to yes';
    // give the error a consistent id
    respondUnauthorized.id = 'Unauthorized';

    responseUnauthorizedString = JSON.stringify(respondUnauthorized);
    statusCode = 401;
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, statusCode, responseUnauthorizedString);
};

const getForbidden = (request, response) => {
  // json message for response
  const respondForbidden = {
    message: 'You do not have access to this content',
    id: 'Forbidden',
  };

  const forbiddenString = JSON.stringify(respondForbidden);

  // return 403 with message
  return respondJSON(request, response, 403, forbiddenString);
};

const getInternal = (request, response) => {
  // json message for response
  const respondInternal = {
    message: 'Internal Server Error. Something went wrong',
    id: 'InternalError',
  };

  const internalString = JSON.stringify(respondInternal);

  // return 500 with message
  return respondJSON(request, response, 500, internalString);
};

const getNotImplemented = (request, response) => {
  // json message for response
  const respondNotImplemented = {
    message:
      'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  const notImplementedString = JSON.stringify(respondNotImplemented);

  // return 501 with message
  return respondJSON(request, response, 501, notImplementedString);
};

// set public modules
module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  getNotFound,
  notFoundMeta,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
};
