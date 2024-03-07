<!-- eslint-disable import/no-absolute-path -->
<template>
  <template v-if="getShow">
    <div class="title enter-x">
      <h2 class="h-center">欢迎登录</h2>
      <span>TouchMed后台管理系统</span>
    </div>
    <el-form class="login-form" :model="loginForm" @keypress.enter="handleLogin">
      <el-form-item class="enter-x" prop="account">
        <el-input size="large" v-model="loginForm.account" placeholder="用户名">
          <template #prefix>
            <div class="flex items-center">
              <SvgIcon style="font-size: 30px; margin-left: -5px" name="login-account"></SvgIcon>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="enter-x input-row">
        <el-input
          type="password"
          size="large"
          v-model="loginForm.password"
          placeholder="密码"
          show-password
        >
          <template #prefix>
            <div class="flex items-center">
              <SvgIcon style="font-size: 30px; margin-left: -5px" name="login-lock"></SvgIcon>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="enter-x button-row">
        <el-button
          type="primary"
          size="large"
          class="w-full"
          @click="handleLogin"
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </template>
</template>

<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput, ElButton, ElNotification } from 'element-plus'
import { ref, reactive, unref, computed } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { LoginStateEnum, useLoginState } from './useLogin'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const { getLoginState } = useLoginState()
const getShow = computed(() => unref(getLoginState.value) === LoginStateEnum.LOGIN)

const loading = ref(false)

const loginForm = reactive<{ account: string; password: string }>({
  account: 'test_doctorxk',
  password: '123456'
})

const userStore = useUserStore()

async function handleLogin() {
  loading.value = true
  try {
    const userInfo = await userStore.toLogin({
      userName: 'admin',
      password: '123456'
    })
    if (userInfo) {
      ElNotification({
        title: '登录成功',
        message: '欢迎回来',
        duration: 3000,
        type: 'success'
      })
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 200px;
  height: 150px;
}

.title {
  margin-top: 30px;
  font-size: 18px;
  font-weight: 400;
  color: #666666;
  line-height: 30px;
  h2 {
    display: inline;
    font-size: 22px;
    font-weight: 500;
    color: #333333;
    margin-right: 10px;
  }
}

.login-form {
  margin-top: 50px;
  width: 380px;

  .input-row {
    margin-top: 30px;
  }
  .button-row {
    margin-top: 50px;
  }
}
</style>
