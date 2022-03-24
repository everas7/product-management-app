
import { LoginForm, LoginResponse } from '../../../app/models/login';
import { request } from '../../../app/services/axios';

export const Access = {
  login: (form: LoginForm): Promise<LoginResponse> =>
    request.post('login', form),
};
