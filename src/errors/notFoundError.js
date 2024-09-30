class NotFoundError extends Error {
  constructor(resourceId, resource) {
    super(`Resource with id ${resourceId} was not found in ${resource}`);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
