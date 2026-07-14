export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
}; 

export type SignUpResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type RefreshResponse = {
  accessToken: string;
};

export type MeResponse = {
  id: string;
  name: string;
  email: string;
}