import { BaseAPI } from './base-api';

export interface LoginRequest {
    login: string;
    password: string;
}

export default class LoginAPI extends BaseAPI {

    public async request(user: LoginRequest) {
        const response = await this.APIInstance.post('/auth/signin', { data: user });
        console.log(response);
        return response.responseText;
    }
  } 