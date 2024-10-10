import MissingArguments from "../errors/missingArguments.js";

export const checkRequiredArguments = (req, requiredArguments, resource) => {
  let missingArguments = [];
  for (const arg of requiredArguments) {
    if (req.body[arg] === undefined) {
      missingArguments.push(arg);
    }
  }
  if (missingArguments.length > 0) {
    throw new MissingArguments(missingArguments, resource);
  }
};
