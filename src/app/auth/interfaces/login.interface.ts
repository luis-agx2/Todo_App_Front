export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
  quote: Quote;
}

interface Quote {
  quote: string;
  author: string;
}
