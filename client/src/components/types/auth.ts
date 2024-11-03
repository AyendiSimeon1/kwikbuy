export interface User {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
  }
  
  export interface AuthState {
    [x: string]: any;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }



export interface LoginResponse {
    login?: string;
    errorMessage?: string;
    errorCode?: string;
    token: string;
    user: User;
  
}

export interface LoginFormData {
  email: string;
  password : string;
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
}

export interface SignupResponse {
  signup: {
    token: string;
    user: User;
  };
}

export interface SignupVariables {
  email: string;
  username: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  username: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
}