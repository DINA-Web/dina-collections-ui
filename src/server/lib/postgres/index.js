const chainPromises = require('../../../utilities/chainPromises')
const createModels = require('./models')
const createControllers = require('./controllers')
const createDb = require('./db')

const syncModels = models => {
  return chainPromises(
    models.map(model => {
      return () => {
        return model.sync({ force: true })
      }
    })
  )
}

module.exports = function bootstrapDatalayer({
  basePath,
  config,
  controllerFiles,
  modelFiles,
}) {
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return createModels({ basePath, config, modelFiles, sequelize }).then(
        models => {
          return syncModels(models).then(() => {
            return createControllers({
              basePath,
              config,
              controllerFiles,
              models,
              sequelize,
            }).then(controllers => {
              return {
                controllers,
                models,
              }
            })
          })
        }
      )
    })
  })
}