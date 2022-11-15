import { ValidationError } from 'express-validator';
import { CustomError } from './custom-errors';
// https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript
// this is to check wether an error is indeed a custom error and it includes a check for serialize errors too incase that method has mistakes in it
// to test out, after creating this interface, implement into the class below and then purposely make a type i the function or status code and it will yell at you
// ex: export class RequestValidationError extends Error Implements CustomError {} <--decided not to use this
// interface CustomError {
//   statusCode: number;
//   serializeErrors(): {
//     message: string;
//     field?: string;
//   }[];
// }

// use Abstract Class instead (interface w/ implements customerrors above)- they cannot be instantiated, used to setup requirements for sublcasses, do create a Class when translated to JS, which means we can use it in the instanceof checks. We want an abstract class so RequestValidationError and DatabseConnectionError can just extend from it and then so your errorhandler doesn't need to do if databaseconnectionerror... or if requestevalidationerror... You'll need to make a new one for every new error you create

export class RequestValidationError extends CustomError {
  statusCode = 400;
  // private/public errors = this.errors = errors & errors:ValidationError (before constructor)
  // transform this errors array which is assigned the ValidationError (hover over to see properties and change it to something more standard and capable for other languages to take as a common structure in the errorhandler.ts)
  constructor(public errors: ValidationError[]) {
    // invokes constructor inside base class, which is Error
    super('Invalid request parameters');
    // Only bc we are extending a built-in class (Error) - see udemy QA. JS' built-in class ERROR will break prototype chain when super is called. It will become an instance of Error and not RequestValidationError. Meaning when you make a new instane of RequestValidationError, it will act as an instance of Error instead when compiling down to ES5.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    // this is errors from contructor
    return this.errors.map((err) => {
      return {
        message: err.msg,
        field: err.param,
      };
    });
  }
}
