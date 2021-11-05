class SuperHeorController {
  
  showAll = (rer, res, next) => {

    res.status('200').send('hello')


    next()
  };
}

module.exports = new SuperHeorController();
