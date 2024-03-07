import { http } from '@/utils/axios/index'

// 分页查询所有博客
export function getArticleList(params: {
  createTimeSort: string
  pageNum: number
  pageSize: number
}) {
  return http.post('/allBlogs', params)
}
// 获取博客详情
export function getArticleDetail(params: {
  id: number
}) {
  return http.post('/blogDetail', params)
}
//新增/更新博客
export function addNewArticle(params: {
  content: string
  id: number
  title: string
}) {
  return http.post('/addOrUpdateBlog', params)
}
// 删除博客
export function deleteArticleById(params: {
  id: number
}) {
  return http.post('/deleteBlog', params)
}
