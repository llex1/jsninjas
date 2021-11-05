class SuperHeorController {
  p
  showAll = (req, res, next) => {

    res.status('200').send('hello')
    next()
  };
}

module.exports = new SuperHeorController();
