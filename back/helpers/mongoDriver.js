const { MongoClient } = require("mongodb");

class MongoController {
  db = null;

  constructor(dbName, poolSize = 5) {
    this.client = new MongoClient(process.env.MONGO1, {
      maxPoolSize: poolSize,
    });
    this.dbName = dbName
  }

  async run() {
    //for PM2 and User
    process.on('SIGINT', (code) => {
      this.disconnect()
      process.exit()
    });
    //for Nodemon
    process.on('SIGUSR2', (code) => {
      this.disconnect()
      process.exit()
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
      console.log("[\x1b[32m OK \x1b[30m] Altas connection");
    } catch (err) {
      // console.log(err);
      console.log("[\x1b[31m ERR \x1b[30m] Altas connection /connect.catch ");
      return false;
    }
    return true;
  };

  disconnect = () => {
    this.client.close();
    console.log("... \n[\x1b[32m OK \x1b[30m] Altas \x1b[31m disconnect \x1b[30m");
  };

  // watcher = (req, res, next) => {
  //   console.log(req.app.locals.db === this.db);
  //   console.log(req.app.locals.db?.s?.client?.topology?.s?.state);
  //   next();
  // };
}

module.exports = MongoController;

