export interface UserRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserRegisterCallback {
  id:	string;
  name:	string;
  email: string;
  emailConfirmed:	boolean;
  confirmationToken: string;
}

export interface UserConfirmationCallBack {
  id:	string
  name:	string
  email: string
  emailConfirmed:	boolean
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface UserLoginCallback {
  expiresIn: number;
  accessToken: string;
  id: string;
  user: UserRegisterCallback;
}
