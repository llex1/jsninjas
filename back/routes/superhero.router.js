const superheroRouter = require('express').Router()
const superheroController = require('../controllers/superhero.controller')

superheroRouter.get('/', superheroController.main)
superheroRouter.get('/image/:heroId', superheroController.getImage)
superheroRouter.get('/info/:heroId', superheroController.getInfo)
superheroRouter.get('/delete/:heroId', superheroController.deleteHero)
superheroRouter.post('/update', superheroController.catchFile, superheroController.update)
superheroRouter.post('/add', superheroController.catchFile, superheroController.add)


module.exports = superheroRouter