require("dotenv").config();
const exprss = require("express");
const superheroRouter = require("./routes/superhero.router");

class Server {
  app = null;

  initApp() {
    this.app = exprss();
  }
  initMiddlewares() {
    this.app.use(exprss.json());
  }
  initRoutes() {
    this.app.use("/", superheroRouter)
  }

  run() {
    this.initApp();
    this.initMiddlewares();
    this.initRoutes();
    this.app.listen(process.env.PORT, () => {
      console.log("server run on port ", process.env.PORT);
    });
  }
}

new Server().run();