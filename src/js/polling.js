import { interval } from 'rxjs';

export default class Polling {
  constructor(server) {
    this.server = server;
    this.messagees = document.querySelector('.messages');
    this.currentTime = new Date().getTime();
  }

  startUpdate() {
    interval(10000).subscribe(() => this.responseMessages());
  }

  async responseMessages() {
    const ajaxData = await this.server.ajaxRx();

    ajaxData.subscribe(
      (data) => {
        data.messages.forEach((elem) => {
          if (elem.received > this.currentTime) {
            this.render(elem);
          }
        });
        this.currentTime = new Date().getTime();
      }, (error) => console.log(error.message),
    );
  }

  render(message) {
    const newMessage = document.createElement('div');
    const email = document.createElement('div');
    const subject = document.createElement('div');
    const time = document.createElement('div');
    newMessage.classList.add('new-message');
    email.textContent = message.from;
    email.style.width = '45%';
    newMessage.appendChild(email);
    if (message.subject.length > 15) {
      subject.textContent = `${message.subject.slice(0, 14)}...`;
    } else {
      subject.textContent = message.subject;
    }

    newMessage.appendChild(subject);
    time.textContent = Polling.getDate(message.received);
    newMessage.appendChild(time);
    this.messagees.insertBefore(newMessage, this.messagees.children[0]);
  }

  static getDate(time) {
    const year = new Date(time).getFullYear();
    let month = new Date(time).getMonth() + 1;
    let day = new Date(time).getDate();
    let hours = new Date(time).getHours();
    let minute = new Date(time).getMinutes();

    if (String(month).length === 1) {
      month = `0${month}`;
    }
    if (String(day).length === 1) {
      day = `0${day}`;
    }
    if (String(minute).length === 1) {
      minute = `0${minute}`;
    }
    if (String(hours).length === 1) {
      hours = `0${hours}`;
    }
    return `${hours}:${minute} ${day}.${month}.${String(year).slice(2)}`;
  }
}
