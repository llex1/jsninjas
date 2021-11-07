const fs = require("fs/promises");
const multer = require("multer")();

console.log(process.memoryUsage().rss / 1000_000);
console.log(process.memoryUsage().heapTotal / 1000_000);
console.log(process.memoryUsage().heapUsed / 1000_000);
console.log(process.memoryUsage().external / 1000_000);
console.log(process.memoryUsage().arrayBuffers / 1000_000);
console.log(process.resourceUsage());

class SuperHeorController {
  catchFile = multer.array("avatar", 2);
  
  showAll = async (req, res, next) => {
    const file = await fs.readFile(__dirname + "/../temp/jsninjas.png");
    res.status("200").send(file);
    next();
  };
  
  addOne = (req, res, next) => {
    console.log(req.files);
    console.log('----------------------------------');
    console.log(process.memoryUsage().rss / 1000_000);
    console.log(process.memoryUsage().heapTotal / 1000_000);
    console.log(process.memoryUsage().heapUsed / 1000_000);
    console.log(process.memoryUsage().external / 1000_000);
    console.log(process.memoryUsage().arrayBuffers / 1000_000);
    console.log('----------------------------------');
    console.log(process.resourceUsage());
    
    res.status("200").send();

    next();
  };
}

module.exports = new SuperHeorController();
