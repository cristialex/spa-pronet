export enum FormPatternsEnum {
  Email = '[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,7}',
  Password = '^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W|_]){1,})(?!.*\\s).{6,30}$',
}

export interface User {
  id: string;
  name: string;
  email: string;
}
