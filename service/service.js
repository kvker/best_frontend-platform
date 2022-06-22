import dom from './dom/dom.js'
import data from './data/data.js'

export default new class Service {
  constructor() {
    this.dom = dom
    this.data = data
  }

  init() { }
}