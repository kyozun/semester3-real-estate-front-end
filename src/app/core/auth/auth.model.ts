export interface User {
  id: string;
  userName: string;
  email: string;
  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
