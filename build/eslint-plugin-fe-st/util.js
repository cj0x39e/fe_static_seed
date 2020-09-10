
const componentComments = new WeakMap()

/**
 * Gets the string of a given node.
 * @param {Literal|TemplateLiteral} node - The node to get.
 * @param {boolean} [stringOnly]
 * @return {string|null} The string if static. Otherwise, null.
 */
function getStringLiteralValue(node, stringOnly) {
  if (node.type === 'Literal') {
    if (node.value == null) {
      if (!stringOnly && node.bigint != null) {
        return node.bigint
      }
      return null
    }
    if (typeof node.value === 'string') {
      return node.value
    }
    if (!stringOnly) {
      return String(node.value)
    }
    return null
  }
  if (node.type === 'TemplateLiteral') {
    if (node.expressions.length === 0 && node.quasis.length === 1) {
      return node.quasis[0].value.cooked
    }
  }
  return null
}

/**
 * Gets the property name of a given node.
 * @param {Property|AssignmentProperty|MethodDefinition|MemberExpression} node - The node to get.
 * @return {string|null} The property name if static. Otherwise, null.
 */
function getStaticPropertyName(node) {
  if (node.type === 'Property' || node.type === 'MethodDefinition') {
    const key = node.key

    if (!node.computed) {
      if (key.type === 'Identifier') {
        return key.name
      }
    }
    return getStringLiteralValue(key)
  } else if (node.type === 'MemberExpression') {
    const property = node.property
    if (!node.computed) {
      if (property.type === 'Identifier') {
        return property.name
      }
      return null
    }
    return getStringLiteralValue(property)
  }
  return null
}

/**
 * Retrieve `TSAsExpression#expression` value if the given node a `TSAsExpression` node. Otherwise, pass through it.
 * @template T Node type
 * @param {T | TSAsExpression} node The node to address.
 * @returns {T} The `TSAsExpression#expression` value if the node is a `TSAsExpression` node. Otherwise, the node.
 */
function skipTSAsExpression(node) {
  if (!node) {
    return node
  }

  if (node.type === 'TSAsExpression') {
    return skipTSAsExpression(node.expression)
  }
  return node
}

/**
 * @param {string} path
 */
function isVueFile(path) {
  return path.endsWith('.vue') || path.endsWith('.jsx')
}

/**
 * Gets the parent node of the given node. This method returns a value ignoring `X as F`.
 * @param {Expression} node
 * @returns {ASTNode}
 */
function getParent(node) {
  let parent = node.parent
  while (parent.type === 'TSAsExpression') {
    parent = parent.parent
  }
  return parent
}

/**
 * Check whether the given node is a Vue component based
 * on the filename and default export type
 * export default {} in .vue || .jsx
 * @param {ESNode} node Node to check
 * @param {string} path File name with extension
 * @returns {boolean}
 */
function isVueComponentFile(node, path) {
  return (
    isVueFile(path) &&
    node.type === 'ExportDefaultDeclaration' &&
    node.declaration.type === 'ObjectExpression'
  )
}

/**
 * Check whether given node is Vue component
 * Vue.component('xxx', {}) || component('xxx', {})
 * @param {ESNode} node Node to check
 * @returns {boolean}
 */
function isVueComponent(node) {
  if (node.type === 'CallExpression') {
    const callee = node.callee

    if (callee.type === 'MemberExpression') {
      const calleeObject = skipTSAsExpression(callee.object)

      if (calleeObject.type === 'Identifier') {
        const propName = getStaticPropertyName(callee)
        if (calleeObject.name === 'Vue') {
          // for Vue.js 2.x
          // Vue.component('xxx', {}) || Vue.mixin({}) || Vue.extend('xxx', {})
          const isFullVueComponentForVue2 =
            propName &&
            ['component', 'mixin', 'extend'].includes(propName) &&
            isObjectArgument(node)

          return Boolean(isFullVueComponentForVue2)
        }

        // for Vue.js 3.x
        // app.component('xxx', {}) || app.mixin({})
        const isFullVueComponent =
          propName &&
          ['component', 'mixin'].includes(propName) &&
          isObjectArgument(node)

        return Boolean(isFullVueComponent)
      }
    }

    if (callee.type === 'Identifier') {
      if (callee.name === 'component') {
        // for Vue.js 2.x
        // component('xxx', {})
        const isDestructedVueComponent = isObjectArgument(node)
        return isDestructedVueComponent
      }
      if (callee.name === 'createApp') {
        // for Vue.js 3.x
        // createApp({})
        const isAppVueComponent = isObjectArgument(node)
        return isAppVueComponent
      }
      if (callee.name === 'defineComponent') {
        // for Vue.js 3.x
        // defineComponent({})
        const isDestructedVueComponent = isObjectArgument(node)
        return isDestructedVueComponent
      }
    }
  }

  return false

  /** @param {CallExpression} node */
  function isObjectArgument(node) {
    return (
      node.arguments.length > 0 &&
      skipTSAsExpression(node.arguments.slice(-1)[0]).type ===
        'ObjectExpression'
    )
  }
}

/**
 * Check whether given node is new Vue instance
 * new Vue({})
 * @param {NewExpression} node Node to check
 * @returns {boolean}
 */
function isVueInstance(node) {
  const callee = node.callee
  return Boolean(
    node.type === 'NewExpression' &&
      callee.type === 'Identifier' &&
      callee.name === 'Vue' &&
      node.arguments.length &&
      skipTSAsExpression(node.arguments[0]).type === 'ObjectExpression'
  )
}

/**
 * Gets the component comments of a given context.
 * @param {RuleContext} context The ESLint rule context object.
 * @return {Token[]} The the component comments.
 */
function getComponentComments(context) {
  let tokens = componentComments.get(context)
  if (tokens) {
    return tokens
  }
  const sourceCode = context.getSourceCode()
  tokens = sourceCode
    .getAllComments()
    .filter((comment) => /@vue\/component/g.test(comment.value))
  componentComments.set(context, tokens)
  return tokens
}

/**
 * If the given object is a Vue component or instance, returns the Vue definition type.
 * @param {RuleContext} context The ESLint rule context object.
 * @param {ObjectExpression} node Node to check
 * @returns { VueObjectType | null } The Vue definition type.
 */
function getVueObjectType(context, node) {
  if (node.type !== 'ObjectExpression') {
    return null
  }
  const parent = getParent(node)
  if (parent.type === 'ExportDefaultDeclaration') {
    // export default {} in .vue || .jsx
    const filePath = context.getFilename()
    if (
      isVueComponentFile(parent, filePath) &&
      skipTSAsExpression(parent.declaration) === node
    ) {
      return 'export'
    }
  } else if (parent.type === 'CallExpression') {
    // Vue.component('xxx', {}) || component('xxx', {})
    if (
      isVueComponent(parent) &&
      skipTSAsExpression(parent.arguments.slice(-1)[0]) === node
    ) {
      return 'definition'
    }
  } else if (parent.type === 'NewExpression') {
    // new Vue({})
    if (
      isVueInstance(parent) &&
      skipTSAsExpression(parent.arguments[0]) === node
    ) {
      return 'instance'
    }
  }
  if (
    getComponentComments(context).some(
      (el) => el.loc.end.line === node.loc.start.line - 1
    )
  ) {
    return 'mark'
  }
  return null
}

/**
 * @template T
 * @param {T} visitor
 * @param {...(TemplateListener | RuleListener | NodeListener)} visitors
 * @returns {T}
 */
function compositingVisitors(visitor, ...visitors) {
  for (const v of visitors) {
    for (const key in v) {
      if (visitor[key]) {
        const o = visitor[key]

        visitor[key] = (...args) => {
          o(...args)

          v[key](...args)
        }
      } else {
        visitor[key] = v[key]
      }
    }
  }
  return visitor
}

/**
   * Check if current file is a Vue component and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param { (node: ObjectExpression, type: VueObjectType) => void } cb Callback function
   */
function executeOnVueComponent(context, cb) {
  return {
    /** @param {ObjectExpression} node */
    'ObjectExpression:exit'(node) {
      const type = getVueObjectType(context, node)
      if (
        !type ||
          (type !== 'mark' && type !== 'export' && type !== 'definition')
      ) { return }
      cb(node, type)
    }
  }
}

/**
   * Check if current file is a Vue instance (new Vue) and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param { (node: ObjectExpression, type: VueObjectType) => void } cb Callback function
   */
function executeOnVueInstance(context, cb) {
  return {
    /** @param {ObjectExpression} node */
    'ObjectExpression:exit'(node) {
      const type = getVueObjectType(context, node)
      if (!type || type !== 'instance') return
      cb(node, type)
    }
  }
}

function executeOnVue(context, cb) {
  compositingVisitors(
    executeOnVueComponent(context, cb),
    executeOnVueInstance(context, cb)
  )
}

module.exports = {
  executeOnVue
}
