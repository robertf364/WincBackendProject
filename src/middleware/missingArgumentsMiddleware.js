const missingArgsMiddleware = (err, req, res, next) => {
  if (err.name == "MissingArguments") {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

export default missingArgsMiddleware;
