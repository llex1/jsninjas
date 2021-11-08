const superheroRouter = require('express').Router()
const superheroController = require('../controllers/superhero.controller')

superheroRouter.get('/', superheroController.getNickname)
superheroRouter.get('/image/:heroId', superheroController.getImage)
superheroRouter.post('/add', superheroController.catchFile, superheroController.add)


module.exports = superheroRouter