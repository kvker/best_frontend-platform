;(function () {
  function PureJS() {
    this.data = {}
    this.dom = {}
    this.config = {
      // 判断是否为华为快应用
      is_hwqa: typeof system !== 'undefined',
    }
    this.cache = {}
    this.callback = {}

    this.util.$$('[id]').forEach((dom) => {
      this.dom[dom.id] = dom
    })
  }

  // 功能函数
  PureJS.prototype.util = {
    $(selector) {
      return document.querySelector(selector)
    },
    $$(selector, is_normal) {
      const doms = document.querySelectorAll(selector)
      return is_normal ? doms : Array.from(doms)
    },
    // template标签根据ES6模板字符串转HTML标签
    template2string(string, params) {
      const keys = Object.keys(params)
      const values = Object.values(params)
      return new Function(...keys, `return \`${string}\``)(...values)
    },
    // 移除常见中文标点
    removePunctuation(string) {
      return string.replace(/，|。|？|！|；|、！|：|“|”|《|【|】|》/g, '&emsp;')
    },
    // 创建子类
    createSubClass(BaseClass = PureJS) {
      function SubClass(...args) {
        BaseClass.apply(this, args)
      }
      const InheritSuper = function () {}
      InheritSuper.prototype = BaseClass.prototype
      SubClass.prototype = new InheritSuper()
      SubClass.prototype.constructor = BaseClass
      return SubClass
    },
  }

  // UI交互处理
  PureJS.prototype.loading = function () {
    if (this.config.is_hwqa) {
      system.postMessage('loading---请求中...')
    } else {
      document.body.style.pointerEvents = 'none'
      document.body.style.opacity = 0.2
    }
  }
  PureJS.prototype.unloading = function () {
    if (this.config.is_hwqa) {
      system.postMessage('unloading')
    } else {
      document.body.style.pointerEvents = 'initial'
      document.body.style.opacity = 1
    }
  }
  PureJS.prototype.alert = function (text) {
    if (this.config.is_hwqa) {
      system.postMessage('alert---' + text)
    } else {
      return window.alert.call(null, text)
    }
  }
  // 数据处理函数
  PureJS.prototype.update = function (data) {
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
  PureJS.prototype.regist = function (key, callback) {
    this.callback[key] = callback.bind(this)
  }
  PureJS.prototype.unregist = function (key) {
    this.callback[key] = null
  }
  PureJS.prototype.remove = function (key) {
    this.data[key] = null
    this.dom[key] = null
    this.callback[key] = null
  }

  window.pjs = new PureJS()
})()
