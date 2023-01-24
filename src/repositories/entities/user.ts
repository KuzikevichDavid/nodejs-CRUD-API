import { ErrValidate } from '../../constants';

export class User {
  constructor(
    public readonly id: string,
    private _username: string,
    private _age: number,
    private _hobbies: string[]
  ) {
    if (!User.isValid(this)) throw ErrValidate;
  }

  public get age(): number {
    return this._age;
  }

  public set age(n: number) {
    if (User.isValidAge(n)) this._age = n;
    else throw ErrValidate;
  }

  public get username(): string {
    return this._username;
  }

  public set username(uName: string) {
    if (User.isValidName(uName)) this._username = uName;
    else throw ErrValidate;
  }

  public get hobbies(): string[] {
    return this._hobbies;
  }

  public set hobbies(hobby: string[]) {
    if (User.isValidHobbies(hobby)) this._hobbies = hobby;
    else throw ErrValidate;
  }

  public toJSON(): object {
    return {
      id: this.id,
      username: this._username,
      age: this._age,
      hobbies: this._hobbies
    };
  }

  private static isValid(user: User): boolean {
    if (
      !User.isValidName(user._username) ||
      !User.isValidAge(user._age) ||
      !User.isValidHobbies(user._hobbies)
    )
      return false;
    return true;
  }

  public static isValidName(uName: string): boolean {
    if (!uName || typeof uName !== 'string' || uName?.trim().length === 0) {
      return false;
    }
    return true;
  }

  public static isValidAge(age: number): boolean {
    if (!age || typeof age !== 'number' || age < 0) {
      return false;
    }
    return true;
  }

  public static isValidHobbies(hobbies: string[]): boolean {
    if (
      !hobbies ||
      !Array.isArray(hobbies) ||
      (hobbies.length > 0 && !hobbies.some((x) => User.isValidName(x)))
    ) {
      return false;
    }
    return true;
  }
}
