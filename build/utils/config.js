/**
 * 配置信息存取器
 */
const fs = require('fs')
const path = require('path')
const { tempDir } = require('./common')

const configFileName = 'config.json'
const configPath = path.join(tempDir, configFileName)
let isInit = true

const getConfigByFile = () => {
  let result = {}
  try {
    result = fs.readFileSync(configPath, 'utf-8')
    result = JSON.parse(result)
  } catch (err) {
    // nothing
  }
  return result
}


const setConfigToFile = (data) => {
  try {
    fs.writeFileSync(configPath, JSON.stringify(data), 'utf-8')
  } catch (err) {
    throw err
  }
}

const setConfigByKey = (key, value) => {
  let data = {}
  if (isInit) {
    isInit = false
  } else {
    data = getConfigByFile()
  }
  
  data[key] = value
  setConfigToFile(data)
}

const getConfigByKey = (key) => {
  const data = getConfigByFile()
  return data[key]
}

module.exports = {
  setConfigByKey,
  getConfigByKey
}