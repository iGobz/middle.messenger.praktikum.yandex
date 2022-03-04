import { UserData } from '../user';
import { BaseAPI } from './base-api';

export default class SignupAPI extends BaseAPI {

    public async request(user: UserData) {
        const response = await this.APIInstance.post('/auth/signup', { data: user });
        console.log(response);
        return response.responseText;
    }
  } 