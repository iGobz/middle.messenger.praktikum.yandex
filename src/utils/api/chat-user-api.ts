import { BaseAPI } from './base-api';


export default class ChatUserAPI extends BaseAPI {

    public async update(data: any) {
        const response = await this.APIInstance.put('/chats/users', { data });
        console.log(response);
        return response;
    }

    public async delete(data: any) {
        const response = await this.APIInstance.delete('/chats/users', { data });
        console.log(response);
        return response;
    }
  } 