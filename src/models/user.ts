import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has (single user)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// async function here is a middleware for moongoose -- every time save, executes async function
// cannot use arrow function because we need access to THIS keyword. Arrow function would make THIS keyword in the context of this entire file. We need the user document
userSchema.pre('save', async function (done) {
  // this keyword is pointing to user document
  if (this.isModified('password')) {
    // this.get gets user passward of user document
    const hashed = await Password.toHash(this.get('password'));

    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// <> generic syntax, takes on list of arguments, Document go before Model, ctrl click on model below.
// bts code shows function model<T extends Document, U extends Model>. U is what is returned.
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// const user = User.build({ email: 'test@gmail.com', password: 'diwndwi' });

export { User };
