import tmi from "tmi.js"

const client = new tmi.Client({
   connection: { reconnect: true },
   channels: ['channels']
});

export default client