<template>
  <div class="login-body">
    <img class="left-img" :src="loginBg" alt="" />
    <div class="login-container">
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './LoginForm.vue'
import loginBg from '@/assets/img/login-bg.png'
</script>

<style lang="less" scoped>
.login-body {
  width: 100%;
  height: 100%;
  background: linear-gradient(153deg, #6067f3 0%, #46ceff 100%);

  display: flex;
  align-items: center;
  justify-content: center;

  .left-img {
    width: 550px;
    height: 460px;
    margin-right: 200px;
  }

  .login-container{
    background-color: #ffffff;
    width: 600px;
    height: 600px;
    border-radius: 20px;
    padding-top: 40px;

    display: flex;
    flex-direction: column;
    align-items: center;

  }
}
</style>
