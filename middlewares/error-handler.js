const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };

  // validation error check
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }

  // // custom cast error
  // if (err.name === "CastError") {
  //   const {
  //     value: { _id: id },
  //   } = err;
  //   if (id === undefined) {
  //     customError.message =
  //       customError.message = `No user is present with id ${err.value}`;
  //     customError.statusCode = 404;
  //   }
  //   customError.message = `No user is present with id ${id}`;
  //   customError.statusCode = 404;
  // }

  return res
    .status(customError.statusCode)
    .json({ msg: customError.message, status: customError.statusCode });
};

module.exports = errorHandlerMiddleware;
