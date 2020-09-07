/**
 * 配置信息存取器
 */
const fs = require('fs').promises
const path = require('path')
const { tempDir } = require('./common')

const configFileName = 'config.json'
const configPath = path.join(tempDir, configFileName)
let isInit = true

const getConfigByFile = async () => {
  let result = {}
  try {
    result = await fs.readFile(configPath, 'utf-8')
    result = JSON.parse(result)
  } catch (err) {
    // nothing
  }
  return result
}

const setConfigToFile = async (data) => {
  try {
    await fs.writeFile(configPath, JSON.stringify(data), 'utf-8')
  } catch (err) {
    throw err
  }
}

const setConfigByKey = async (key, value) => {
  let data = {}
  if (isInit) {
    isInit = false
  } else {
    data = await getConfigByFile()
  }
  
  data[key] = value
  await setConfigToFile(data)
}

const getConfigByKey = async (key) => {
  const data = await getConfigByFile()
  return data[key]
}

module.exports = {
  setConfigByKey,
  getConfigByKey
}