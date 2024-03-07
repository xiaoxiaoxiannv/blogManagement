import { AddRouteRecordRaw } from '../../types'
const Layout = () => import('@/layout/index.vue')

const followupPlan:AddRouteRecordRaw = {
  path: '/article',
  name: 'article',
  component: Layout,
  redirect: '/article/list',
  meta: {
    title: '博文管理',
    icon: 'route-follow',
    orderNo: 1
  },
  children: [
    {
      path: 'list',
      name: 'ArticleList',
      meta: {
        title: '文章列表'
        // fixedTab: true
      },
      component: () =>
        import('@/views/modules/article/list/index.vue')
    },
    {
      path: 'addArticle',
      name: 'AddArticle',
      meta: {
        title: '编辑文章',
        noKeepAlive: true,
        hideMenu: true
      },
      component: () =>
          import('@/views/modules/article/addArticle/index.vue')
    },
    {
      path: 'articleInfo',
      name: 'ArticleInfo',
      meta: {
        title: '查看文章',
        noKeepAlive: true,
        hideMenu: true
      },
      component: () =>
        import('@/views/modules/article/articleInfo/index.vue')
    }
  ]
}

export default followupPlan
