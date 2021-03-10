import DB from "./db.js"

const database = {
   create() {
      DB.delete("/");
      DB.push("/users", new Set);
      DB.push("/messages", new Set);
   },

   getData(name) {
      return DB.getData(name);
   },

   remove(name) {
      DB.delete(name)
   },

   add(name, core) {
      let data = DB.getData(name);
      data.add(core);
      DB.delete(name);
      DB.push(name, data);
      DB.save();
   },

   delete(name, core) {
      let data = DB.getData(name);
      data.delete(core);
      DB.delete(name);
      DB.push(name, data);
      DB.save();
   },

   clear(name) {
      DB.delete(name);
      DB.push(name, new Set);
   }
}

export default database