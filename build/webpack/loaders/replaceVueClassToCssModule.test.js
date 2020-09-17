const replaceVueClassToCssModule = require('./replaceVueClassToCssModule')

const name = 'test'
const toName = '__TEST__'

const test = (title, html, expectHtml) => {
  const resultHtml = replaceVueClassToCssModule(name, toName, html)
  console.assert(expectHtml === resultHtml, title, `\n${resultHtml}`)
}

test(
  '原生 class 名字中含有当前单词，应该不替换',
  `<div class=" other${name} ${name} other "></div> <div class=" other ${name} other "></div>`,
  `<div class=" other${name} ${toName} other "></div> <div class=" other ${toName} other "></div>`
)

test(
  '原生 class 多个元素使用同一个 class',
  `<div class=" other ${name} other "></div> <div class=" other ${name} other "></div>`,
  `<div class=" other ${toName} other "></div> <div class=" other ${toName} other "></div>`
)

test(
  '原生 class 前后加空格加class',
  `<div class=" other ${name} other "></div>`,
  `<div class=" other ${toName} other "></div>`
)

test(
  '原生 class 前后加 class',
  `<div class="other ${name} other"></div>`,
  `<div class="other ${toName} other"></div>`
)

test(
  '原生 class 后面加 class',
  `<div class="${name} other"></div>`,
  `<div class="${toName} other"></div>`
)

test(
  '原生 class 前面加 class',
  `<div class="other ${name} "></div>`,
  `<div class="other ${toName} "></div>`
)

test(
  '原生 class 前后加空格',
  `<div class=" ${name} "></div>`,
  `<div class=" ${toName} "></div>`
)

test(
  '原生 class 后面加空格',
  `<div class="${name} "></div>`,
  `<div class="${toName} "></div>`
)

test(
  '原生 class 前面加空格',
  `<div class=" ${name}"></div>`,
  `<div class=" ${toName}"></div>`
)

test(
  '原生 class',
  `<div class="${name}"></div>`,
  `<div class="${toName}"></div>`
)
