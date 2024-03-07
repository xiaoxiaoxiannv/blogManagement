import { App } from 'vue'
import { ElInfiniteScroll, ElLoadingDirective } from 'element-plus'
import ElTableInfiniteScroll from 'el-table-infinite-scroll'

// 配置全局指令
export function setupDirectives(app: App) {
  app.directive('elTableInfiniteScroll', ElTableInfiniteScroll)
  app.directive('loading', ElLoadingDirective)
  app.directive('infiniteScroll', ElInfiniteScroll)
}
