
const replaceVueClassToCssModule = (className, moduleClassName, html) => {
  const reg = new RegExp(`class=\"(.*?)\"`, 'g')

  return html.replace(reg, function(replacement, $1) {
    let classList = $1.split(/\s+/)
    classList = classList.map(name => name === className ? moduleClassName : name)
    return replacement.replace($1, classList.join(' '))
  })
}

module.exports = replaceVueClassToCssModule
