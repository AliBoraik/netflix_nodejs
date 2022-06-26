class Error {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
  static badRequest(message) {
    return new Error(400, message);
  }
  static internal(message) {
    return new Error(500, message);
  }
}

module.exports = Error;
