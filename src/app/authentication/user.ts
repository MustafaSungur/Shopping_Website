export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExperitonDate: Date
  ) {}

  get token() {
    if (!this._tokenExperitonDate || new Date() > this._tokenExperitonDate) {
      return null;
    }
    return this._token;
  }
}
