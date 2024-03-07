<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElMessage, ElUpload, ElIcon } from 'element-plus'
import { addNewArticle, getArticleDetail} from '@/api/article'
import { useRouter } from 'vue-router'
import { cloneDeep } from 'lodash-es';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { debounce } from 'lodash-es';

export default defineComponent({
  name: 'AddEducationArticle',
  components: { ElForm, ElFormItem, ElUpload, ElIcon, MdEditor },
  setup() {
    const defaultArticleInfo = {
      content: '',
      createTime:'',
      id: -1,
      title: '',
      updateTime: ''
    }
    const router = useRouter()
    const formData = reactive(cloneDeep(defaultArticleInfo))
    const loading = ref(true)
    const { currentRoute } = useRouter()
    const articleId = currentRoute.value.query.articleId
    getPlanInfoData(articleId)

    async function getPlanInfoData(articleId: any) {
      if (articleId) {
        console.log('编辑文章current articleId : ', articleId)
        const res = await getArticleDetail({id:articleId})
        console.log('res', res)
        Object.assign(formData, res);
        loading.value = false
      } else {
        console.log('传入的articleId为空,操作为新增')
        loading.value = false
      }
    }

    const rules = reactive(
      {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        url: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      })
// @ts-ignore
    function validateArticleInfo(formData) {
      const requiredFields = [
        { field: 'title', message: '请输入标题' },
        { field: 'content', message: '请输入文章内容' }
      ];
      for (const field of requiredFields) {
        if (field.field === 'content' && formData[field.field] === '<p><br></p>') {
          ElMessage.error(field.message);
          return false;
        }
        if (!formData[field.field]) {
          ElMessage.error(field.message);
          return false;
        }
      }
      return true;
    }
    async function submitForm() {
      console.log('formData', formData)
      if (!validateArticleInfo(formData)) {
        return;
      }
      try {
        const params = {
          id: formData.id,
          title: formData.title,
          content: formData.content,
        }
        const data = await addNewArticle(params) as number
        console.log('data', data)
        if (articleId) {
          ElMessage.success('修改文章成功');
        } else {
          ElMessage.success('新增文章成功');
        }
        router.push(
          {
            name: 'ArticleInfo',
            query: {articleId: data}
          }
        )
      } catch (error) { // @ts-ignore
        console.error('操作失败:', error.message);
      }
    }
    function handleCancel() {
      router.push('/')
    }
    const toolbarsExclude=['image','save','github','prettier']
    const debouncedSubmitForm = debounce(submitForm, 1000);
    return {
      defaultArticleInfo,
      formData,
      loading,
      submitForm,
      handleCancel,
      rules,
      toolbarsExclude,
      debouncedSubmitForm
    }
  }
})
</script>

<template>
  <BasicContainer v-loading="loading">
    <ElForm :model="formData" label-width="100px" size="large" :rules="rules">
      <ElFormItem
        label="标题"
        prop="title"
      >
        <ElInput class="w-1/4" v-model="formData.title" placeholder="请输入标题"></ElInput>
      </ElFormItem>
    </ElForm>
    <md-editor v-model="formData.content" :toolbarsExclude=toolbarsExclude />
    <div class="flex items-center justify-end mt-10">
      <ElButton size="large" class="w-32 mr-5" @click="handleCancel">取消</ElButton>
      <ElButton size="large" class="w-32" type="primary" @click="debouncedSubmitForm">保存</ElButton>
    </div>
  </BasicContainer>
</template>

