import Polling from './polling';
import Server from './server';

console.log('app started');

const server = new Server();
const widget = new Polling(server);

widget.startUpdate();
