import { scrypt, randomBytes } from 'crypto'; // built-in for node. no need to install
import { promisify } from 'util';

// need to ne make this async because scrypt is callback based. Returns buffer, which is array with raw data
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    // from database and destructuring the salt from when it was set in the toHash password
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
