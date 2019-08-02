<template>
  <div class="login">
    <el-tabs v-model="activeName" stretch class="tabs" type="card" @tab-click="handleClick">
      <el-tab-pane :class="{active: currentTab == 0}" label="登录" name="first">
        <!-- 登录功能组件 -->
        <LoginForm v-if="currentTab == 0" />
      </el-tab-pane>
      <el-tab-pane :class="{active: currentTab == 1}" label="注册" name="second">
        <!-- 注册功能组件 -->
        <RegisterForm v-if="currentTab == 1" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LoginForm from '@/components/user/loginForm'
import RegisterForm from '@/components/user/registerForm'
export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      currentTab: 0,
      activeName: 'first'
    }
  },
  mounted() {
    // console.log('$', this.$store)
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      this.currentTab = tab.index
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) no-repeat;
  height: 700px;
  min-width: 1000px;
  border-top: 1px solid #fff;
  .tabs {
    background-color: #fff;
    width: 400px;
    // height: 50px;
    // border-top: 2px solid gold;
    margin: 20% auto;
  }
}
.active {
  color: orange;
  border-top-color: orange;
  font-weight: bold;
  background:#fff;
}
</style>
