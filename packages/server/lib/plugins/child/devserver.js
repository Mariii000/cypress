// const webpackDevServer
const util = require('../util')
const { startEvergreen } = require('@cypress/evergreen')

const wrap = (ipc, invoke, ids, [ arg ]) => {

  const { specs, config } = arg
  const devserverConfig = {
    support: '', // file path
    files: specs, // { { path: f.path, absolute: path.resolve(f.path) }
    projectRoot: config.projectRoot, // file path
  }

  util.wrapChildPromise(ipc, invoke, ids, [], async (webpackConfig) => {
    const webpackDevServer = await startEvergreen(webpackConfig, devserverConfig)

    return new Promise((resolve) => {
      const httpSvr = webpackDevServer.listen(0, '127.0.0.1', () => {
        resolve(httpSvr.address().port)
      })
    })
  })
}

module.exports = {
  wrap,
}