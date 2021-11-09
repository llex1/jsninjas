const fs = require("fs/promises");
const { Buffer } = require("buffer");
const { fork } = require("child_process");
const multer = require("multer")();
const uuid = require("short-uuid");

class SuperHeorController {
  catchFile = multer.array("images", 10);

  main = async (req, res, next) => {
    let result;
    let page = 0;
    if (+req.query.page > 1) {
      page = +req.query.page - 1;
    }
    try {
      result = await req.app.locals.db1
        .collection(process.env.DB1Collection1)
        .find(
          {},
          {
            projection: {
              nickname: 1,
              heroId: 1,
              isImagesExist: 1,
            },
          }
        )
        .limit(5)
        .skip(page * 5)
        .toArray();
    } catch (err) {}

    res.status("200").send(result);
    next();
  };

  getImage = async (req, res, next) => {
    const heroId = req.params.heroId;
    let result;
    let buff = false;
    try {
      result = await req.app.locals.db2
        .collection(process.env.DB2Collection1)
        .findOne(
          { heroId: heroId },
          {
            projection: {
              files: { $first: "$files" },
            },
          }
        );
        buff = Buffer.from(result.files.buffer, "base64");
    } catch (err) {
      console.log(err);
    }
    res.status(200).send(buff);
    next();
  };

  getInfo = async (req, res, next) => {
    const heroId = req.params.heroId;
    let result;

    try {
      result = await req.app.locals.db1
        .collection(process.env.DB1Collection1).findOne({heroId:heroId});
    } catch (err) {
      console.log(err);
    }
    res.status("200").send(result);
    next();
  };

  add = async (req, res, next) => {
    const { nickname, realname, description, superpowers, phrase } = req.body;
    const images = {};
    const heroId = uuid.generate();
    let isImagesExist = false;
    // let isImagesReady = false;
    let chProcess;
    if (req.files.length) {
      chProcess = fork(__dirname + "/../helpers/uploadImages");
      //поки створюється процес, підготую данні
      isImagesExist = true;
      images.isUpdate = false;
      images.heroId = heroId;
      images["files"] = req.files.map((el, idx, arr) => {
        const imageId = uuid.generate();
        return {
          imageId: imageId,
          buffer: el.buffer.toString("base64"),
        };
      });
      chProcess.send(images);
    }
    try {
      await req.app.locals.db1
        .collection(process.env.DB1Collection1)
        .insertOne({
          heroId,
          nickname,
          realname,
          description,
          superpowers,
          phrase,
          isImagesExist,
          // isImagesReady
        });
    } catch (err) {
      console.error(err);
    }
    res.status("200").send();
    next();
  };

  deleteHero = async (req, res, next)=>{
    const heroId = req.params.heroId;
    const isImagesExist = req.query.isImagesExist
    let resultInfo;
    try {
      resultInfo = await req.app.locals.db1
        .collection(process.env.DB1Collection1)
        .deleteOne({
          heroId:heroId
        });
    } catch (err) {
      console.error(err);
    }
    if(isImagesExist){
      try {
        await req.app.locals.db2
          .collection(process.env.DB2Collection1)
          .deleteOne({
            heroId:heroId
          });
      } catch (err) {
        console.error(err);
      }
    }
    if(resultInfo?.deletedCount){
      return res.status("200").send();
    }
    res.status("500").send({message: "something wrong"});
    next()
  }

  update = async (req, res, next) => {
    const { heroId, nickname, realname, description, superpowers, phrase, isImagesExist } = req.body;
    const images = {};
 
    let chProcess;
    if (req.files.length) {
      chProcess = fork(__dirname + "/../helpers/uploadImages");
      //поки створюється процес, підготую данні
      images.isUpdate = isImagesExist;
      images.heroId = heroId;
      images["files"] = req.files.map((el, idx, arr) => {
        const imageId = uuid.generate();
        return {
          imageId: imageId,
          buffer: el.buffer.toString("base64"),
        };
      });
      chProcess.send(images);
    }
    try {
      await req.app.locals.db1
        .collection(process.env.DB1Collection1)
        .findOneAndUpdate({heroId: heroId},{$set: {
          nickname,
          realname,
          description,
          superpowers,
          phrase,
          isImagesExist,
          // isImagesReady
        }
        });
    } catch (err) {
      console.error(err);
    }
    res.status("200").send();
    next();
  };
}

module.exports = new SuperHeorController();
