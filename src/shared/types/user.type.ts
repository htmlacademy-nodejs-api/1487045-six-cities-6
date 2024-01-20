export enum UserType {
  Normal = 'Normal',
  Pro = 'Pro',
}

export type User = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserType;
};
