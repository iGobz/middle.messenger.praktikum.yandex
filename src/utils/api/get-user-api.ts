import { BaseAPI } from './base-api';

export default class GetUserAPI extends BaseAPI {

    public async request() {
        const response = await this.APIInstance.get('/auth/user');
        console.log(response);
        // {"id":309779,"first_name":"Ivan","second_name":"Kuznetsov",
        // "display_name":null,"login":"ivan","avatar":null,"email":"ivan@ivan.com","phone":"+79991234567"}

        return response;
    }
  } 