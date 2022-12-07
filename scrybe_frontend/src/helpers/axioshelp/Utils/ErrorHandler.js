const ErrorHandler = (err) => {
  if (err.code === "ERR_NETWORK") {
    return {
      type: "error",
      message: "You are offline",
    };
  }
  if (err.code === "ERR_BAD_REQUEST") {
    if (err.response.data) {
      return {
        type: "error",
        message: err.response.data.message
          ? err.response.data.message
          : "Something went wrong",
      };
    } else {
      return {
        type: "error",
        message: "Something went wrong",
      };
    }
  }
  return {
    type: "error",
    message: "Something went wrong",
  };
};

export default ErrorHandler;
