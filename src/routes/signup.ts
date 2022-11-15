import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'; // can do validation of params in url
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    // Returns an array of errors
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
      // If only JavaScript
      // const error = new Error('Invalid email or password');
      // errors.array() is from errors = validationResult(req) -- then iterate over the array and send back to user. But since not JS, TS won't allow you to assign a new property to errors, whereas JS will let you and this is how you should do it if only JS.
      //  we want to Error object, whch means creating properties on it for TS -- we want RequestValidationError and DatabaseConnectionError
      // error.reasons = errors.array();
      // this will get picked up by errorHandler middleware
      // throw new Error('Invalid email or password');
    }

    const { email, password } = req.body;

    console.log('Creating a user...');
    throw new DatabaseConnectionError();

    res.send({});

    if (!email || typeof email !== 'string') {
      res.status(400).send('Provide a valid email');
    }

    res.send('Hi there!');
  }
);

export { router as signupRouter };
