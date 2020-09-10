const utils = require('./util')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const WHITE_LIST = [
  'props',
  'data'
]

const checkProperties = (properties, context, node) => {

  try {
    for(let i = 0; i < properties.length; i++) {
      const property = properties[i]
      if (property.type === 'Property' && 
        property.key.type === 'Identifier' &&
        property.key.name && 
        !WHITE_LIST.includes(property.key.name)
      ) {
        context.report({
          node,
          message: '请不要使用 Vue 与 HTML 交互的相关属性: {{ name }}！！',
          data: { name: property.key.name }
        });
        break;
      }
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code'
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.executeOnVue(context, (obj) => {
      checkProperties(obj.properties, context, obj)
    })
  }
}
