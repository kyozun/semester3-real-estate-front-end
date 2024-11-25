export interface UserResponse {
  id: string;
  userName: string;
  email: string;
  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
}
