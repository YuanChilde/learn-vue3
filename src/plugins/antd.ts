import { Button, Card, Row, Col, Tag, Form, Input } from "ant-design-vue"
import { createApp } from "vue"

/**
 * @description 手动注册 antd-vue 组件,达到按需加载目的
 * @description Automatically register components under Button, such as Button.Group
 * @param {ReturnType<typeof createApp>} app 整个应用的实例
 * @returns void
 */
export default function loadComponent(app: ReturnType<typeof createApp>) {
  app.use(Button)
  app.use(Card)
  app.use(Row)
  app.use(Col)
  app.use(Tag)
  app.use(Form)
  app.use(Input)
}
