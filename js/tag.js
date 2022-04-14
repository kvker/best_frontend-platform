/**
 * 模型
 * name
 * description
 * only 是否全文档唯一
 * children 对应必须存在的子标签
 * attributes
 */

// 被绑定的子元素
const children_tag = {
  figcaption: {
    name: 'figcaption',
    description: '标签定义 figure 元素的标题（caption）。',
    attributes: [],
  },
  li: {
    name: 'li',
    description: '标签定义列表项目。',
    attributes: [],
  },
}

// 元素表
const tags = [
  {
    name: 'header',
    description: '标签定义文档的页眉（介绍信息）。',
    attributes: [],
  },
  {
    name: 'main',
    description: '标签规定文档的主要内容。',
    only: true,
    attributes: [],
  },
  {
    name: 'footer',
    description: '标签定义文档或节的页脚。',
    attributes: [],
  },
  {
    name: 'div',
    description: '可定义文档中的分区或节（division/section）。',
    attributes: [],
  },
  {
    name: 'section',
    description: '<section> 标签定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。',
    attributes: [],
  },
  {
    name: 'figure',
    description: '标签规定独立的流内容（图像、图表、照片、代码等等）。',
    attributes: [],
    children: children_tag.figcaption,
  },
  {
    name: 'ul',
    description: '标签定义无序列表。',
    attributes: [],
    children: children_tag.li,
  },
  {
    name: 'li',
    description: '标签定义有序列表。',
    attributes: [],
    children: children_tag.li,
  },
  {
    name: 'form',
    description: '标签定义有序列表。',
    attributes: [
      { name: 'action', description: '规定当提交表单时向何处发送表单数据。' },
      { name: 'autocomplete', description: '规定是否启用表单的自动完成功能。' },
      { name: 'method', description: '规定用于发送 form-data 的 HTTP 方法。' },
      { name: 'name', description: '规定表单的名称。' },
    ],
  },
  {
    name: 'input',
    description: '标签定义有序列表。',
    attributes: [
      { name: 'accept', description: '规定通过文件上传来提交的文件的类型。' },
      { name: 'alt', description: '定义图像输入的替代文本。' },
      { name: 'autofocus', description: '规定输入字段在页面加载时是否获得焦点' },
      { name: 'autocomplete', description: '规定是否使用输入字段的自动完成功能。' },
      { name: 'checked', description: '规定此 input 元素首次加载时应当被选中。' },
      { name: 'disabled', description: '当 input 元素加载时禁用此元素' },
      { name: 'form', description: '规定输入字段所属的一个或多个表单。' },
      { name: 'max', description: '规定输入字段的最大值。' },
      { name: 'maxlength', description: '规定输入字段中的字符的最大长度。' },
      { name: 'min', description: '规定输入字段的最小值。' },
      { name: 'multiple', description: '如果使用该属性，则允许一个以上的值。' },
      { name: 'name', description: '定义 input 元素的名称。' },
      { name: 'pattern', description: '规定输入字段的值的模式或格式。' },
      { name: 'placeholder', description: '规定帮助用户填写输入字段的提示。' },
      { name: 'readonly', description: '规定输入字段为只读。' },
      { name: 'required', description: '指示输入字段的值是必需的。' },
      {
        name: 'type',
        description: '规定 input 元素的类型。',
        attributes: [
          { name: 'text', description: '默认值，当前标签跳转。' },
          { name: 'button', description: '定义可点击按钮（多数情况下，用于通过 JavaScript 启动脚本）。' },
          { name: 'checkbox', description: '定义复选框。' },
          { name: 'file', description: '定义输入字段和 "浏览"按钮，供文件上传。' },
          { name: 'password', description: '定义密码字段。该字段中的字符被掩码。' },
          { name: 'radio', description: '	定义单选按钮。' },
          { name: 'reset', description: '定义重置按钮。重置按钮会清除表单中的所有数据。' },
          { name: 'submit', description: '定义提交按钮。提交按钮会把表单数据发送到服务器。' },
        ],
      },
      { name: 'value', description: '规定 input 元素的值。' },
    ],
  },
  {
    name: 'select',
    description: '标签定义有序列表。',
    attributes: [],
  },
  {
    name: 'button',
    description: '标签定义有序列表。',
    attributes: [],
  },
  {
    name: 'a',
    description: '标签定义超链接，用于从一张页面链接到另一张页面。',
    attributes: [
      { name: 'download', description: '规定被下载的超链接目标。' },
      { name: 'href', description: '规定链接指向的页面的 URL。' },
      {
        name: 'target',
        description: '规定在何处打开链接文档。',
        attributes: [
          { name: '_self', description: '默认值，当前标签跳转。' },
          { name: '_blank', description: '新建标签打开。' },
          { name: '_parent', description: '在父框架集中打开被链接文档。' },
          { name: '_top', description: '在整个窗口中打开被链接文档。' },
        ],
      },
      { name: 'type', description: '规定被链接文档的的 MIME 类型。' },
    ],
  },
]

const total_attribute = [
  { name: 'id', description: '元素的索引id' },
  { name: 'class', description: '元素的样式表' },
  { name: 'title', description: '元素被鼠标悬浮的标题。' },
  { name: 'style', description: '标签用于为 HTML 文档定义样式信息。' },
  { name: 'hidden', description: '相当于display: none;' },
]

export default tags.map((i) => ({
  ...i,
  ...total_attribute,
}))
