const superheroRouter = require('express').Router()
const superheroController = require('../controllers/superhero.controller')

superheroRouter.get('/', superheroController.showAll)
superheroRouter.post('/addone', superheroController.catchFile, superheroController.addOne)


module.exports = superheroRouter