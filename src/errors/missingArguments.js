class MissingArguments extends Error {
  constructor(missingArguments, resource) {
    super(
      `You cannot create a ${resource} without providing the following argument(s): ${missingArguments.join(
        " & "
      )}`
    );
    this.name = "MissingArguments";
  }
}

export default MissingArguments;
