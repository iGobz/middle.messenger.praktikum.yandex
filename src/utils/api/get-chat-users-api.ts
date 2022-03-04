import { BaseAPI } from './base-api';

export default class GetChatUsersAPI extends BaseAPI {

    public async request(id: number) {
        const response = await this.APIInstance.get(`/chats/${id}/users`);
        return response;
    }
  } 