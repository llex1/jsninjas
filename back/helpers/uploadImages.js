// const fs = require("fs/promises");
const { MongoClient } = require("mongodb");
process.on("message", (props) => {
  run(props);
});
async function run({ isUpdate, heroId, files }) {
  if (isUpdate) {
    try {
      const client = new MongoClient(process.env.MONGO2, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      console.log(
        "[\x1b[32m OK \x1b[30m] Altas connection DB2 \x1b[36m child process \x1b[30m"
      );
      const db = await client.db(process.env.DB2);

      await db.collection(process.env.DB2Collection1).findOneAndUpdate(
        { heroId: heroId },
        {
          $push: { files: { $each: files } },
        }
      );
      await client.close();
      console.log(
        "[\x1b[32m OK \x1b[30m] Altas \x1b[31m disconnect \x1b[30m DB2  \x1b[36m child process \x1b[30m"
      );
    } catch (e) {
      console.log(
        "[\x1b[31m ERR \x1b[30m] Altas connection /connect.catch DB2 \x1b[36m child process \x1b[30m"
      );
      console.error(e);
    }
  }
  if (!isUpdate) {
    try {
      const client = new MongoClient(process.env.MONGO2, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      console.log(
        "[\x1b[32m OK \x1b[30m] Altas connection DB2 \x1b[36m child process \x1b[30m"
      );
      const db = await client.db(process.env.DB2);
      await db.collection(process.env.DB2Collection1).insertOne({
        heroId,
        files,
      });
      await client.close();
      console.log(
        "[\x1b[32m OK \x1b[30m] Altas \x1b[31m disconnect \x1b[30m DB2  \x1b[36m child process \x1b[30m"
      );
    } catch (e) {
      console.log(
        "[\x1b[31m ERR \x1b[30m] Altas connection /connect.catch DB2 \x1b[36m child process \x1b[30m"
      );
      console.error(e);
    }
  }
}
