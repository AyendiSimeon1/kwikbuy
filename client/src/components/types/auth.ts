export interface User {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }



export interface LoginResponse {
    login: any;
  
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