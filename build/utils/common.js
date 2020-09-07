const path = require('path')

const tempDir =  path.resolve(__dirname, '../../\.tuliu')
const entryFileName = path.join(tempDir, '/entry.js')
const srcDir =  path.resolve(__dirname, '../../src')
const distDir =  path.resolve(__dirname, '../../dist')
const pagesDir =  path.resolve(__dirname, '../../src/pages')

module.exports = {
  tempDir,
  entryFileName,
  srcDir,
  distDir,
  pagesDir
}