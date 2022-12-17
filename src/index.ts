import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose'; // used to connect to mongo db instance
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
// throw will pass to errorhandler below it -- all means all methods
// each route handler must use a next() to receive -- see express documentation for how express catches async routehandlers
// or stick with throw keyword -- install express-async-errors which will change the defaukt behavior of express and its treatment of async errors -- no need for next()
app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth'); // if locally, url wil look like 'mongodb://localhost. But we are connecting to another pod. So need that cluster ip service - the auth-mongo-depl.yaml file. mongodb://name of service in mongo-depl files/name_of_db. Mongoose v6 does not require config options object in arg
    console.log('connected to mongodb');
  } catch (err) {
    console.error(err);
  }
  //repositioned into after try catch in side of start to ensure connection to mongo occurred
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!');
  });
};

start();
