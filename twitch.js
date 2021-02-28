import tmi from "tmi.js"

const client = new tmi.Client({
   connection: { reconnect: true },
   channels: ['csgomc_ru']
});

export default client