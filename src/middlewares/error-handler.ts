import { Request, Response, NextFunction } from 'express';
// import { RequestValidationError } from '../errors/request-validation-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { CustomError } from '../errors/custom-errors';

// common structure ts: { errors: { message: string, field?:string }[] } field is optional

// sits at bottom index.ts catches error from different routes where these instances of errors are thrown and then caught here
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ errors: [{ message: err.serializeErrors() }] });
  }

  // if (err instanceof RequestValidationError) { <--- not needed now with CustomError abstract defining type
  //   console.log('Handling this error as a request validation error');
  // See the errors folder for requesvalidationerror and you'll see a errors: ValidationError[]. The err.errors property "errors" below is that. And ValidationError[] is array. Now you're taking err.errors array and reconstructing it to be a common structure so other languages can take it on. the msg param are native to ValidationError[] of express-validator
  // const formattedErrors = err.errors.map((error) => { <--- no longer need as the RequestValidationError class takes care of this formatting
  //   return { message: error.msg, field: error.param };
  // });

  //   return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }

  // if (err instanceof DatabaseConnectionError) { <--- not needed now with abstract CustomError defining type
  //   return res
  //     .status(err.statusCode)
  //     .send({ errors: [{ message: err.serializeErrors() }] }); // field is optional, not needed here
  // }
  // send back consistently structured message -- might be sending back to different programming languages
  // string provided in throw new Error('message') is assigned to message property
  res.status(400).send({ errors: [{ message: 'Something else went wrong' }] });
};
