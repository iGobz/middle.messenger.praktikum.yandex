import { BaseAPI } from './base-api';

export default class GetChatsAPI extends BaseAPI {

    public async request() {
        const response = await this.APIInstance.get('/chats');
        return response;
    }
  } 