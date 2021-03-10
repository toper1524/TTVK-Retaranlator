import njdb from 'node-json-db';
import dbc from 'node-json-db/dist/lib/JsonDBConfig.js'
const { JsonDB } = njdb;
const { Config } = dbc;

let DB = new JsonDB(new Config("database", true, false, '/'));

export default DB