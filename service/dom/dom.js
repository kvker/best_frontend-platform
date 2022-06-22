export default new class DOM {
  data = {}
  el = {}
  config = {}
  cache = {}
  callback = {}

  constructor() {
    Array.from(document.querySelectorAll('[id]')).forEach(dom => {
      this.el[dom.id] = dom
    })
  }

  init() { }

  // 更新数据
  update(data) {
    let value, value_origin, callback
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        value = data[key]
        value_origin = this.data[key]
        callback = this.callback[key]
        if (value !== value_origin) {
          this.data[key] = value
          callback && callback(value, data)
        }
      }
    }
  }

  regist(key, callback) {
    this.callback[key] = callback.bind(this)
  }

  unregist(key) {
    this.callback[key] = null
  }

  remove(key) {
    this.data[key] = null
    this.el[key] = null
    this.callback[key] = null
  }
}