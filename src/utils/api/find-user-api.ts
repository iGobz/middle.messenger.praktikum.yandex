import { BaseAPI } from './base-api';

export default class FindUserAPI extends BaseAPI {

    public async request(data: any) {
        const response = await this.APIInstance.post('/user/search', data);
        return response;
    }
  } 