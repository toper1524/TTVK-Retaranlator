import side_vk from "./vk/vk.js"
import side_twitch from "./twitch/twitch.js"
import database from "./db/dbMiddleware.js"

database.create();
side_vk(database);
side_twitch(database);

// let recipients = [287792387]; 