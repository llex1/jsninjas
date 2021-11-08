const fs = require("fs/promises");
const { Buffer } = require('buffer');
const { ConnectionPoolMonitoringEvent } = require("mongodb");
const multer = require("multer")();

fs.readFile(__dirname + "/../temp/image0.png").then((data)=>console.log(data))

class SuperHeorController {
  catchFile = multer.array('images', 10);
  
  getNickname = async (req, res, next) => {
    // const file = await fs.readFile(__dirname + "/../temp/jsninjas.png");
    // console.log(req.query);
    let result;
    try{
      result = await req.app.locals.db.collection(process.env.DB1Collection1).find({}, {
        projection:{
        nickname:1,
        // image:{$first: "$images"}
        }
      }
      ).limit(5).toArray()
    }catch(err){}

    res.status("200").send(result);
    next();
  };


  getImage = async (req, res, next)=>{
    const heroId = req.query.heroId
    let result
    try{
      // resultFile = await fs.readFile(__dirname + "/../temp/image0.png");
      // console.log(resultFile);
      result = await req.app.locals.db.collection(process.env.DB1Collection1).findOne({id: heroId}, 
        // {
        // projection:{
        // images:{$first: "$images"}
        // }
      // }
      )
    }catch(err){}
    const buf1 = Buffer.from(result.images.data);
    console.log(result.images.data);
    console.log(buf1);
    // const fff = ggg.replace(`new Binary(Buffer.from("`, "")
    // const newBufer = new Buffer.from(result.images.buffer, "hex")
    res.status(200).send(buf1)
    next()
  }
  

  add = async (req, res, next) => {
    const {nickname, realname, description, superpowers, phrase} = req.body
    const imageBuff = req.files[0].buffer.toJSON()
    // try{
    //   await fs.stat(`${__dirname}/../temp`)
    // }catch(err){
    //   await fs.mkdir(`${__dirname}/../temp`)
    //   console.log("[\x1b[33m INFO \x1b[30m] create TEMP folder");
    // }
    // for(let i=0; i<req.files.length; i++){
    //   fs.writeFile(`${__dirname}/../temp/image${i}.${req.files[i].mimetype.replace('image/', '')}`, req.files[i].buffer)
    // }
    try{
      await req.app.locals.db.collection(process.env.DB1Collection1).insertOne({
        nickname, 
        realname, 
        description, 
        superpowers, 
        phrase,
        // images: [...req.files]
        images: imageBuff
      })
    }catch(err){
      
    }



    res.status("200").send();

    next();
  };
}

module.exports = new SuperHeorController();
