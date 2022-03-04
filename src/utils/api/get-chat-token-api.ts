import { BaseAPI } from './base-api';

export default class GetChatTokenAPI extends BaseAPI {

    public async request(id: number) {
        const response = await this.APIInstance.post(`/chats/token/${id}`);
        return response;
    }
  } 