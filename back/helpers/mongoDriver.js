const { MongoClient } = require("mongodb");

class MongoController {
  db = null;

  constructor(url, dbName, poolSize = 5) {
    this.client = new MongoClient(url, {
      maxPoolSize: poolSize,
    });
    this.dbName = dbName
  }

  async run() {
    //for PM2 and User
    process.on('SIGINT', (code) => {
      this.disconnect()
      setTimeout(()=>{
        process.exit()
      }, 1000)
    });
    //for Nodemon
    process.on('SIGUSR2', (code) => {
      this.disconnect()
      setTimeout(()=>{
        process.exit()
      }, 1000)
    });
    if (await this.connect()) {
      return this.db;
    }
    if (!(await this.connect())) {
      return { panic: "Altas connection" };
    }
  }

  connect = async () => {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log(`[\x1b[32m OK \x1b[30m] Altas connection DB - ${this.dbName}`);
    } catch (err) {
      // console.log(err);
      console.log(`[\x1b[31m ERR \x1b[30m] Altas connection /connect.catch DB - ${this.dbName}`);
      return false;
    }
    return true;
  };

  disconnect = () => {
    if(this.client.topology?.s?.state){
      this.client.close();
      console.log(`.. \n[\x1b[32m OK \x1b[30m] Altas \x1b[31m disconnect \x1b[30m DB - ${this.dbName}`);
    }
  };

  // watcher = (req, res, next) => {
  //   console.log(req.app.locals.db === this.db);
  //   console.log(req.app.locals.db?.s?.client?.topology?.s?.state);
  //   next();
  // };
}

module.exports = MongoController;

