import HTTPTransport from '../HTTPTransport';

export class BaseAPI {

    APIInstance: HTTPTransport;

    constructor() {

        this.APIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');

    }

    create() { throw new Error('Not implemented'); }

    request(data: any): Promise<any> { throw new Error('Not implemented'); }

    update(data: any) { throw new Error('Not implemented'); }

    delete(data: any) { throw new Error('Not implemented'); }
}