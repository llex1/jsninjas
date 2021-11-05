const fs = require('fs/promises');

class SuperHeorController {
  showAll = async (req, res, next) => {
    const file = await fs.readFile(__dirname+"/../temp/jsninjas.png")
    res.status('200').send(file)
    next()
  };
}

module.exports = new SuperHeorController();
