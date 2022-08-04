import { ajax } from 'rxjs/ajax';

export default class Server {
  constructor() {
    this.url = 'https://bombik815-http.herokuapp.com';
  }

  ajaxRx() {
    const obs$ = ajax.getJSON(`${this.url}/messages/unread`);
    return obs$;
  }
}
