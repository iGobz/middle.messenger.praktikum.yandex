import { BaseAPI } from './base-api';


export default class CreateChatAPI extends BaseAPI {

    public async request(data: any) {
        const response = await this.APIInstance.post('/chats', { data });
        console.log(response);
        return response.responseText;
    }
  } 