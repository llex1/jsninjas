const superheroRouter = require('express').Router()
const superheroController = require('../controllers/superhero.controller')

superheroRouter.get('/', superheroController.main)
superheroRouter.get('/image/:heroId', superheroController.getImage)
superheroRouter.get('/info/:heroId', superheroController.getInfo)
superheroRouter.delete('/delete/:heroId', superheroController.deleteHero)
superheroRouter.put('/update', superheroController.catchFile, superheroController.update)
superheroRouter.post('/add', superheroController.catchFile, superheroController.add)


module.exports = superheroRouter