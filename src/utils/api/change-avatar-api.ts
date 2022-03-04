import { BaseAPI } from './base-api';

export interface PasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export default class ChangeAvatarAPI extends BaseAPI {

    public async update(data: any) {
        const response = await this.APIInstance.put('/user/profile/avatar', { 
            data, 
            headers: { 
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response);
        return response;
    }
} 