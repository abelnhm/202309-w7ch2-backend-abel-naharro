import { hash, compare } from 'bcrypt';

export abstract class Auth {
  static hash(value: string): Promise<string> {
    const satRound = 10;
    return hash(value, satRound);
  }

  static compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
