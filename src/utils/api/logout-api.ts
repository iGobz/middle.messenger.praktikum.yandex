import { BaseAPI } from './base-api';

export default class LogoutAPI extends BaseAPI {

    public async request() {
        const response = await this.APIInstance.post('/auth/logout');
        console.log(response);
        return response.responseText;
    }
  } 