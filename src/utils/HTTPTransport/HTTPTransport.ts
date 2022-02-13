enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: Method;
  data?: any;
};

function queryStringify(data: Record<string, any>) {
  return Object.entries(data).map(([key, value]) => key + '=' + value).join('&');
}
export default class HTTPTransport {
  get(url: string, options: Options = { method: Method.GET }): Promise<XMLHttpRequest> {
    if (options.data) {
      url += '?' + queryStringify(options.data);
      options.data = {};
    }
    return this.request(url, { ...options, method: Method.GET });
  }

  post(url: string, options: Options = { method: Method.POST }): Promise<XMLHttpRequest> {
    return this.request(url, options);
  }

  put(url: string, options: Options = { method: Method.PUT }): Promise<XMLHttpRequest> {
    return this.request(url, options);
  }

  delete(url: string, options: Options = { method: Method.DELETE }): Promise<XMLHttpRequest> {
    return this.request(url, options);
  }

  request(url: string, options: Options = { method: Method.GET }): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;

      xhr.onload = function () {
        const { status, response } = xhr;
        if (status === 200 || status === 201) {
          return resolve(JSON.parse(response));
        }
        return reject(JSON.parse(response));
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
