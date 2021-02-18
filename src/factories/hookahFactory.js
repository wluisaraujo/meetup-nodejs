const HookahRepository = require('../repositories/hookahRepository')
const HookahService = require('../services/hookahService')

const { join } = require('path')
const fileDir = join(__dirname, '../../database', 'data.json')

const generateInstance = () => {
    const hookahRepository = new HookahRepository({
      file: fileDir
    })

const hookahService = new HookahService({
    HookahRepository
})

    return hookahService
}

module.exports = { generateInstance }

// generateInstance().find().then(console.log)