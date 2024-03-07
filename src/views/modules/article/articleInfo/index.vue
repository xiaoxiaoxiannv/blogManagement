<script lang="ts" setup>
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getArticleDetail } from '@/api/article';
import { MdPreview }  from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const baseInfo = reactive({
    loading: true,
    articleInfo: {
      content: '',
      createAt: '',
      createdBy: '',
      doctorId: '',
      enabled: 1,
      id: '',
      title: '',
      updateAt: '',
      updatedBy: '',
      url: ''
    }
  }
)

const { currentRoute } = useRouter()
const articleId = currentRoute.value.query.articleId
getBaseInfoData(articleId)

async function getBaseInfoData(articleId:any) {
  if (!articleId) {
    return
  }
  const res = await getArticleDetail({id:articleId})
  // console.log('res', res)
  // @ts-ignore
  baseInfo.articleInfo = res
  baseInfo.loading = false
}
</script>

<template>
  <div class="add-scheme" v-loading="baseInfo.loading">
    <ElDescriptions
      :column="1"
      size="large"
      :border="false"
    >
      <ElDescriptionsItem  class-name="my-title">{{ baseInfo.articleInfo.title }}</ElDescriptionsItem>
      <ElDescriptionsItem>
        <MdPreview editorId="preview-only" :modelValue="baseInfo.articleInfo.content" />
      </ElDescriptionsItem>
    </ElDescriptions>
  </div>
</template>

<style lang="less" scoped>
.add-scheme {
  padding: 30px 50px 30px 30px;
  border-radius: 20px;
  background-color: var(--el-bg-color);
}
:deep(.my-title) {
  color: #3f4a54;
  font-size: 36px;
  font-weight: bold;
}
:deep(.md-editor-preview-wrapper){
  padding: 0;
}
</style>
