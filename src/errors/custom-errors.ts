export abstract class CustomError extends Error {
  // This abstract class is primarily to standardize the errors, so in errorhandler you don't need need to have an 'if' condition for every error class you build
  // ALSO, this abstract class makes sure any other programmer creating a custom error implements the customerror correctly
  // all the properties and methods a class must have if extending customerror

  abstract statusCode: number;

  constructor(message: string) {
    // super() here is like calling new Error(message)
    super(message);

    Object.setPrototypeOf(this, CustomError);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
