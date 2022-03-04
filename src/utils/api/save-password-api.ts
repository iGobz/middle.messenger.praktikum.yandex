import { BaseAPI } from './base-api';

export interface PasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export default class SavePasswordAPI extends BaseAPI {

    public async update(data: PasswordRequest) {
        const response = await this.APIInstance.put('/user/password', { data });
        console.log(response);
        return response.responseText;
    }
  } 