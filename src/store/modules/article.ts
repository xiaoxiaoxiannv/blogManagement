import { defineStore } from 'pinia'

type ArticleItem<T = any> = {
  id: string
  title: string
  content?: string
  tagList: TagType[]
} & { [K in keyof T]: T[K] }

interface ArticleType {
  list: Array<ArticleItem>
}

export const useArticleStore = defineStore({
  id: 'article-locale',
  state: (): ArticleType => ({
    list: []
  }),
  getters: {
    getArticles(): Array<ArticleItem> {
      return this.list
    }
  },
  actions: {
    getArticle(id: string): ArticleItem | undefined {
      return this.getArticles.find((item) => item.id === id)
    },
    delArticle(id: string) {
      const index = this.getArticles.findIndex((item) => item.id === id)
      if (index === -1) return
      this.list.splice(index, 1)
    },
    addArticle(item: ArticleItem) {
      this.list.push(item)
    }
  }
})
