const path = require('path')
const shell = require('shelljs');
const constants = require('../../constants');
const config = require('../../utils/config')

function CleanUpPlugin () {}

CleanUpPlugin.prototype.apply = function (compiler) {
  compiler.hooks.done.tap('CleanUpPlugin', stats => {
    const pageName = config.getConfigByKey('pageName')
    const distSrc = path.resolve(__dirname, '../../../dist')
    const staticSrc = path.resolve(__dirname, '../../../static')

    // copy static file to dist
    shell.cp('-R', path.resolve(staticSrc, `./css/*`), path.resolve(distSrc, `./css`));
    shell.cp('-R', path.resolve(staticSrc, `./js/*`), path.resolve(distSrc, `./js`));

    // // move css file to css directory
    shell.mv(path.resolve(distSrc, `./*.css`), path.resolve(distSrc, `./css`))

    // // remove unused files
    shell.rm('-rf', path.resolve(distSrc, `./${constants.COMMON_STYLES}.js`))
    shell.rm('-rf', path.resolve(distSrc, `./${constants.UI_COMPONENTS}.js`))
    shell.rm('-rf', path.resolve(distSrc, `./${pageName}.js`))
    shell.rm('-rf', path.resolve(distSrc, `./vue-ssr-server-bundle.json`))

    // move js file to js directory
    shell.mv(path.resolve(distSrc, `./*.js`), path.resolve(distSrc, `./js`))
  })
}

module.exports = CleanUpPlugin