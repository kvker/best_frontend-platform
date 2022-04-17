;(function init() {
  const App = pjs.util.createSubClass()
  window.app = new App()
  if (tags.length % 2) tags.push({ name: '' })
  const fragment = document.createDocumentFragment()
  tags.forEach((tag) => {
    const button = document.createElement('button')
    button.classList = 'button-element'
    button.textContent = tag.name
    if (!tag.name) button.classList.add('hidden')
    fragment.append(button)
  })
  app.dom.element_box.append(fragment)
})()

function clickElementBox(event) {
  const target = event.target
  if (target.classList.contains('button-element')) {
    const dom = document.createElement(target.textContent)
    dom.classList = 'preview-default'
    dom.textContent = target.textContent
    app.dom.preview.append(dom)
  }
}

function clickPreview(event) {
  const target = event.target
  if (target.classList.contains('preview-default')) {
    const text = target.textContent
    const tag = tags.find((tag) => tag.name === text)
    if (!tag) return
    app.dom.attribute_box.innerHTML = ''
    app.dom.attribute_box.append(createAttribute(tag.attributes))
  }
}

// 创建dom工具
function createAttribute(attributes) {
  const fragment = document.createDocumentFragment()
  let element, p, input
  attributes.forEach((attribute) => {
    // 享元
    element = document.createElement('section')
    element.classList = 'attribute-editor-box'
    p = document.createElement('p')
    p.textContent = attribute.name
    p.classList = 'attribute-editor-title'
    input = document.createElement('input')
    input.placeholder = attribute.name
    input.classList = 'attribute-editor-input'
    element.append(p)
    element.append(input)
    fragment.append(element)
  })
  return fragment
}
