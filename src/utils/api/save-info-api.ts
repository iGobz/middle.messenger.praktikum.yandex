import { UserData } from '../user';
import { BaseAPI } from './base-api';

// export interface InfoRequest {
//     login: string;
//     password: string;
// }

export default class SaveInfoAPI extends BaseAPI {

    public async update(user: UserData) {
        const response = await this.APIInstance.put('/user/profile', { data: user });
        console.log(response);
        return response.responseText;
    }
  } 