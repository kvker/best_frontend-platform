import service from '/service/service.js'
const { dom, data } = service

new class App {
  current_dom

  constructor() {
    this.init()
  }

  init() {
    if (data.tag.length % 2) data.tag.push({ name: '' })
    const fragment = document.createDocumentFragment()
    data.tag.forEach((tag) => {
      const button = document.createElement('button')
      button.classList = 'button-element'
      button.textContent = tag.name
      if (!tag.name) button.classList.add('hidden')
      fragment.append(button)
    })
    dom.el.element_box.append(fragment)

    dom.el.element_box.addEventListener('click', this.clickElementBox.bind(this))
    dom.el.preview_box.addEventListener('click', e => {
      this.current_dom = null
      dom.el.nav_title.innerText = ''
    })
    dom.el.preview.addEventListener('click', this.clickPreview.bind(this))
    dom.el.download.addEventListener('click', this.clickDownload.bind(this))
  }

  clickElementBox(event) {
    const target = event.target
    if (target.classList.contains('button-element')) {
      const element = document.createElement(target.textContent)
      element.classList = 'preview-default'
      element.textContent = target.textContent
      if (target.textContent === 'input' || target.textContent === 'textarea') {
        element.readOnly = true
      }
      if (this.current_dom) this.current_dom.append(element)
      else dom.el.preview.append(element)
    }
  }

  clickPreview(event) {
    event.stopPropagation()
    const target = event.target
    this.current_dom = target
    dom.el.nav_title.innerText = target.id || target.innerText
    if (target.classList.contains('preview-default')) {
      const text = target.textContent
      const tag = data.tag.find((tag) => tag.name === text)
      if (!tag) return
      dom.el.attribute_box.innerHTML = ''
      dom.el.attribute_box.append(this.createAttribute(tag.attributes, target))
    }
  }

  // 创建dom工具
  createAttribute(attributes, target) {
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
      dom.el.attribute_box.innerHTML = ''
    }
    fragment.append(button)
    return fragment
  }

  clickDownload() {
    const a = document.createElement('a')
    const blob = new Blob([dom.el.preview.innerHTML], { type: 'text/plain' })
    a.href = URL.createObjectURL(blob)
    a.download = 'demo.html'
    a.click()
  }
}