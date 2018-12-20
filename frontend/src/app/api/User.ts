export interface User {
  username?: string;
  password?: string;
  firstName: string;
  lastName: string;
  eMail: string;
  userRoles: Array<string>;
  managedProjects: Array<number>;
}
