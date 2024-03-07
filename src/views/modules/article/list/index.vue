<template>
  <div>
    <WidthContainer>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <ElButton type="primary" size="large" class="w-32" @click="goAddArticle">新增博客</ElButton>
        </div>
        <div class="flex items-center">
          <span class="mr-10px">排序</span>
          <ElSelect v-model="dataContainer.sort" size="large" class="w-32" placeholder="请选择" @change="handleSortChange">
            <ElOption label="时间降序" value="desc"></ElOption>
            <ElOption label="时间升序" value="asc"></ElOption>
          </ElSelect>
        </div>
      </div>
    </WidthContainer>
    <div ref="divRef">
      <el-table v-loading="dataContainer.loading" class="mt-5" :data="dataContainer.tableData" :height="autoHeight">
        <el-table-column align="center" label="标题" prop="title"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="{ row,$index }">
            <ElButton type="primary" link @click="toArticleInfo(row)">查看</ElButton>
            <ElButton type="primary" link @click="editArticle(row)">编辑</ElButton>
            <ElPopover
              placement="top"
              :visible="popVisible[$index]"
              :width="200"
              trigger="click">
              <div>
                <p>确定删除该文章吗?</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="small" @click="closePopover($index)">取消</el-button>
                  <el-button type="primary" size="small" @click="deleteArticle(row,$index)">确定</el-button>
                </div>
              </div>
              <template #reference>
                <ElButton link type="danger" slot="reference" @click="popVisible[$index] = true">删除</ElButton>
              </template>
            </ElPopover>
          </template>
        </el-table-column>
        <template #empty>
          <ElEmpty></ElEmpty>
        </template>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        v-show="true"
        :total="dataContainer.total"
        :background="true"
        :current-page="dataContainer.currentPage"
        :page-size="dataContainer.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts">
import {ElEmpty, ElOption, ElSelect, ElTable, ElTableColumn, ElPagination, ElPopover, ElMessage} from 'element-plus'
import {defineComponent, reactive, ref} from 'vue'
import {useAutoHeight} from '@/hooks/dom/useAutoHeight'
import {useRouter} from 'vue-router';
import {deleteArticleById, getArticleList} from '@/api/article';

export default defineComponent({
  name: 'TaskList',
  components: {ElTable, ElTableColumn, ElSelect, ElOption, ElEmpty, ElPagination, ElPopover},
  setup() {
    const dataContainer = reactive({
      loading: false,
      articleTitle: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        {
          content: '',
          createTime: '',
          id: -1,
          title: '',
          updateTime: '',
          description: '',
        }
      ],
      sort: ''
    })
    getTableData(1, 10,'asc')
    const router = useRouter()

// @ts-ignore
    async function getTableData(currentPage, pageSize,createTimeSort) {
      const res = await getArticleList({
        createTimeSort:createTimeSort,
        pageNum: currentPage,
        pageSize: pageSize
      })
      console.log('res', res)// @ts-ignore
      dataContainer.tableData = res.content// @ts-ignore
      dataContainer.currentPage = res.number// @ts-ignore
      dataContainer.pageSize = res.size// @ts-ignore
      dataContainer.total = res.totalElements
      dataContainer.loading = false
    }

    const handleSizeChange = (val: number) => {
      console.log('dataContainer.currentPage',dataContainer.currentPage,`每页${val}条`,'dataContainer.sort',dataContainer.sort)
      getTableData(dataContainer.currentPage, val, dataContainer.sort)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`当前页是第: ${val}页`,'dataContainer.pageSize',dataContainer.pageSize,'dataContainer.sort',dataContainer.sort)
      getTableData(val, dataContainer.pageSize, dataContainer.sort)
    }

    const popVisible = reactive([])
    dataContainer.tableData.forEach(() => { // @ts-ignore
      popVisible.push(false);
    });

    function goAddArticle() {
      router.push('/article/addArticle')
    }

// @ts-ignore
    function toArticleInfo(row) {
      console.log(row)
      if (!row) return
      router.push(
        {
          name: 'ArticleInfo',
          query: {articleId: row.id}
        }
      )
    }

// @ts-ignore
    function editArticle(row) {
      console.log(row)
      if (!row) return
      router.push(
        {
          name: 'AddArticle',
          query: {articleId: row.id}
        }
      )
    }

// @ts-ignore
    function closePopover(index) { // @ts-ignore
      popVisible[index] = false
    }

// @ts-ignore
    async function deleteArticle(row, index) {
      console.log('row', row)
      try {
        await deleteArticleById({id:row.id})
        ElMessage.success('删除成功');
        console.log('dataContainer.currentPage',dataContainer.currentPage,'dataContainer.pageSize',dataContainer.pageSize,dataContainer.sort)
        getTableData(dataContainer.currentPage, dataContainer.pageSize,dataContainer.sort)
      } catch (error) { // @ts-ignore
        console.log('操作失败', error.message)
      }
      closePopover(index)
    }

    // table自动高度
    const divRef = ref<HTMLDivElement>()
    const {autoHeight} = useAutoHeight(divRef, 30)
    // watch(dataContainer, (newValue) => {
    //   const { currentPage, pageSize, sort } = newValue;
    //   getTableData(currentPage, pageSize, sort);
    // });
    const handleSortChange = (val:string) => {
        console.log('dataContainer.currentPage',dataContainer.currentPage,'dataContainer.pageSize',dataContainer.pageSize,'选择的排序选项:', val);
        getTableData(dataContainer.currentPage, dataContainer.pageSize, val);
    };
    return {
      dataContainer,
      divRef,
      autoHeight,
      goAddArticle,
      toArticleInfo,
      editArticle,
      deleteArticle,
      closePopover,
      popVisible,
      handleSizeChange,
      handleCurrentChange,
      handleSortChange
    }
  }
})
</script>
<style lang="less" scoped>
.title {
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
}

.mr-10px {
  margin-right: 10px;
}

.page-container {
  display: flex;
  justify-content: end;
}
</style>
