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
    if(target.textContent === 'input' || target.textContent === 'textarea') {
      dom.readOnly = true
    }
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
    app.dom.attribute_box.append(createAttribute(tag.attributes, target))
  }
}

// 创建dom工具
function createAttribute(attributes, target) {
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
    input.classList = 'attribute-editor-input'
    input.value = target.getAttribute(attribute.name) || ''
    // 0.3s延迟处理
    let timeout
    input.oninput = function (e) {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        target.setAttribute(attribute.name, this.value)
      }, 500)
    }
    element.append(p)
    element.append(input)
    fragment.append(element)
  })
  const button = document.createElement('button')
  button.textContent = '删除'
  button.classList = 'attribute-delete-button'
  button.onclick = function () {
    app.dom.attribute_box.innerHTML = ''
  }
  fragment.append(button)
  return fragment
}
