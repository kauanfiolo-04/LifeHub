export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
}; 

export type LoginResponse = {
  accessToken: string;
};

export type SignUpResponse = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}