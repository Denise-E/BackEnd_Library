class ValidationError extends Error {
    constructor(message) {
      super(message);
    }
  }

class NotFoundError extends Error{
  constructor(message) {
    super(message);
  }
}

class InvalidParameterError extends Error{
  constructor(message) {
    super(message);
  }
}
  
export default { ValidationError, NotFoundError, InvalidParameterError };
