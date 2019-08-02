<template>
  <div class="loginForm">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"

      class="form"
    >
      <el-form-item class="form-item" prop="username">
        <el-input v-model="form.username" type="text" placeholder="请输入用户名/手机号" autocomplete="off" />
      </el-form-item>
      <el-form-item class="form-item" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" autocomplete="off" />
      </el-form-item>
      <p class="form-text">
        <nuxt-link to="#">
          忘记密码
        </nuxt-link>
      </p>

      <el-button class="submit" @click="handleLoginSubmit">
        登录
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLoginSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // this.$axios({
          //   url: '/accounts/login',
          //   method: 'POST',
          //   data: this.form
          // }).then((res) => {
          //   this.$store.commit('user/setUserInfo', res.data)
          //   // console.log('setUserInfo的res.data', res.data)
          //   // console.log('setUserInfo的res', res)
          //   this.$router.push('/')
          // })

          this.$store.dispatch('user/login', this.form).then((res) => {
            console.log('正在跳转res', res)
            this.$message({
              message: '登录成功，正在跳转',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.replace('/')
            }, 1500)
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
   .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
