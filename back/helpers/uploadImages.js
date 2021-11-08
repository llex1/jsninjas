// const fs = require("fs/promises");
const { MongoClient } = require("mongodb");


process.on("message", (props) => {
  run(props);
});

async function run({ heroId, files }) {
  try {
    const client = new MongoClient(process.env.MONGO2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("[\x1b[32m OK \x1b[30m] Altas connection DB2 \x1b[36m child process \x1b[30m");
    const db = await client.db(process.env.DB2);
    await db.collection(process.env.DB2Collection1).insertOne({
      heroId,
      files,
    });
    await client.close();
    console.log("[\x1b[32m OK \x1b[30m] Altas \x1b[31m disconnect \x1b[30m DB2  \x1b[36m child process \x1b[30m");
  } catch (e) {
    console.log("[\x1b[31m ERR \x1b[30m] Altas connection /connect.catch DB2 \x1b[36m child process \x1b[30m");
    console.error(e);
  }
}

// try{
//   await fs.stat(`${__dirname}/../temp`)
// }catch(err){
//   await fs.mkdir(`${__dirname}/../temp`)
//   console.log("[\x1b[33m INFO \x1b[30m] create TEMP folder");
// }
// for(let i=0; i<req.files.length; i++){
//   fs.writeFile(`${__dirname}/../temp/image${i}.${req.files[i].mimetype.replace('image/', '')}`, req.files[i].buffer)
// }
