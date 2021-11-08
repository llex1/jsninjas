require("dotenv").config();
const exprss = require("express");
const cors = require('cors');
const MongoController = require('./helpers/mongoDriver');

const superheroRouter = require("./routes/superhero.router");

//dev dependency module
const morgan = require('morgan').token('servername', (req)=> req.client.servername);

class Server {
  app = null;

  initApp() {
    this.app = exprss();
  }
  async initDB() {
    this.app.locals.db1 = await (new MongoController(process.env.MONGO1, process.env.DB1)).run()
    this.app.locals.db2 = await (new MongoController(process.env.MONGO2, process.env.DB2)).run()
  }
  initMiddlewares() {
    this.app.use(morgan(':method \x1b[36m:servername:url\x1b[0m  - [:status] :response-time ms'))
    this.app.use(cors({
      origin:"*"
    }))
    this.app.use(exprss.json());
  }
  initRoutes() {
    this.app.use("/", superheroRouter)
  }

  run() {
    this.initApp();
    this.initDB()
    this.initMiddlewares();
    this.initRoutes();
    this.app.listen(process.env.PORT || "8080", () => {
      console.log("[\x1b[32m OK \x1b[30m] server running on port", process.env.PORT);
    });
  }
}

new Server().run();
