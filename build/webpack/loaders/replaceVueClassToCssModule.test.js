const replaceVueClassToCssModule = require('./replaceVueClassToCssModule')

const name = 'test'
const toName = '__TEST__'

const test = (title, html, expectHtml) => {
  const resultHtml = replaceVueClassToCssModule(name, toName, html)
  console.assert(expectHtml === resultHtml, title, `\n${resultHtml}`)
}

test(
  'v-bind:class 对象语法带引号',
  `<div v-bind:class="{'${name}':isOk}"></div>`,
  `<div v-bind:class="{'${toName}':isOk}"></div>`
)

test(
  ':class 对象语法带引号',
  `<div :class="{'${name}':isOk}"></div>`,
  `<div :class="{'${toName}':isOk}"></div>`
)

test(
  ':class 对象语法',
  `<div :class="{${name}:isOk}"></div>`,
  `<div :class="{'${toName}':isOk}"></div>`
)

test(
  'v-bind:class 对象语法',
  `<div v-bind:class="{${name}:isOk}"></div>`,
  `<div v-bind:class="{'${toName}':isOk}"></div>`
)

test(
  ':class 字符串前后加类',
  `<div :class="'before ${name} after'"></div>`,
  `<div :class="'before ${toName} after'"></div>`
)

test(
  'v-bind:class 字符串前后加 class',
  `<div v-bind:class="'before ${name} after'"></div>`,
  `<div v-bind:class="'before ${toName} after'"></div>`
)

test(
  ':class 字符串前后空格',
  `<div :class="' ${name} '"></div>`,
  `<div :class="' ${toName} '"></div>`
)

test(
  'v-bind:class 字符串前后空格',
  `<div v-bind:class="' ${name} '"></div>`,
  `<div v-bind:class="' ${toName} '"></div>`
)

test(
  ':class 字符串',
  `<div :class="'${name}'"></div>`,
  `<div :class="'${toName}'"></div>`
)

test(
  'v-bind:class 字符串',
  `<div v-bind:class="'${name}'"></div>`,
  `<div v-bind:class="'${toName}'"></div>`
)

test(
  '原生 class 名字中含有当前单词，应该不替换',
  `<div class=" other${name} ${name} other "></div> <div class=" other ${name} other "></div>`,
  `<div class=" other${name} ${toName} other "></div> <div class=" other ${toName} other "></div>`
)

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
