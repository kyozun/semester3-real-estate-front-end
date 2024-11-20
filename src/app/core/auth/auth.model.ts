export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
