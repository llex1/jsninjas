const superheroRouter = require('express').Router()
const superheroController = require('../controllers/superhero.controller')

superheroRouter.get('/', superheroController.showAll)


module.exports = superheroRouter