import { App } from 'vue'
import BasicContainer from '../container/BasicContainer.vue'
import WidthContainer from '../container/WidthContainer.vue'
import { ElButton, ElCol, ElInput, ElRow } from 'element-plus'

export function setupComponents(app: App) {
  app.component('BasicContainer', BasicContainer)
  app.component('WidthContainer', WidthContainer)
  app.component('ElButton', ElButton)
  app.component('ElInput', ElInput)
  app.component('ElRow', ElRow)
  app.component('ElCol', ElCol)
  // app.use(ElementPlus)
}
