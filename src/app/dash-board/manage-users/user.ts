import { Role } from './Role';

export class User {
  constructor(
    public userid: number,
    public username: string,
    public profileID: string | null,
    public createAt: Date,
    public profileImage: string | null,

    public role: Role
  ) {}
}
