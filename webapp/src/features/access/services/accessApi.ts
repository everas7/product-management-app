
import { LoginForm, LoginResponse } from '../../../app/models/login';
import { SignupForm, SignupResponse } from '../../../app/models/signup';
import { request } from '../../../app/services/axios';

export const Access = {
  login: (form: LoginForm): Promise<LoginResponse> =>
    request.post('login', form),
  signup: (form: SignupForm): Promise<SignupResponse> =>
    request.post('signup', form),
};
