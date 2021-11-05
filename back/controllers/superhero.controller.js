class SuperHeorController {
  p
  showAll = (req, res, next) => {

    res.status('200').send('hello')

    console.log(req.files[0].buffer);
    next()
  };
}

module.exports = new SuperHeorController();
