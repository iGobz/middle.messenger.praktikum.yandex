import { BaseAPI } from './base-api';


export default class DeleteChatAPI extends BaseAPI {

    public async delete(data: any) {
        const response = await this.APIInstance.delete('/chats', { data });
        console.log(response);
        return response;
    }
  } 