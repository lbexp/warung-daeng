export class SignInRequest {
  email: string;
  password: string;
}

export class SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export class SignInResponse {
  accessToken: string;
}
