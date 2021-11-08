const fs = require("fs/promises");
const { Buffer } = require("buffer");
const { fork } = require("child_process");
const multer = require("multer")();
const uuid = require("short-uuid");

// fs.readFile(__dirname + "/../temp/image0.png").then((data)=>console.log(data))

class SuperHeorController {
  catchFile = multer.array("images", 10);

  getNickname = async (req, res, next) => {
    // const file = await fs.readFile(__dirname + "/../temp/jsninjas.png");
    let result;
    let page = 0
    if(+(req.query.page)>1){page = +(req.query.page)-1}
    try {
      result = await req.app.locals.db1
        .collection(process.env.DB1Collection1)
        .find(
          {},
          {
            projection: {
              nickname: 1,
              heroId:1,
              isImagesExist:1
            },
          }
        )
        .limit(5)
        .skip(page*5)
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
      // resultFile = await fs.readFile(__dirname + "/../temp/image0.png");
      // console.log(resultFile);
      result = await req.app.locals.db2
        .collection(process.env.DB1Collection1)
        .findOne(
          { heroId: heroId },
          {
          projection:{
            files:{$first: "$files"}
          }
          }
        );
    } catch (err) {}
    buff = Buffer.from(result.files.buffer, 'base64');
    res.status(200).send(buff);
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
      images.heroId = heroId;
      images["files"] = req.files.map((el, idx, arr) => {
        const imageId = uuid.generate();
        return {
          imageId: imageId,
          buffer: el.buffer.toString('base64'),
        };
      });
      chProcess.send(images);
    }
    try {
      await req.app.locals.db1.collection(process.env.DB1Collection1).insertOne({
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
}

module.exports = new SuperHeorController();
