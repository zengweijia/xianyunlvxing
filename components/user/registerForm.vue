<template>
  <div class="loginForm">
    <el-form ref="form" :model="form" :rules="rules" class="form">
      <el-form-item class="form-item" prop="username">
        <el-input v-model="form.username" placeholder="用户名手机" />
      </el-form-item>

      <el-form-item class="form-item" prop="captcha">
        <el-input v-model="form.captcha" placeholder="验证码">
          <template slot="append">
            <el-button @click="handleSendCaptcha">
              发送验证码
            </el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item class="form-item" prop="nickname">
        <el-input v-model="form.nickname" placeholder="你的名字" />
      </el-form-item>

      <el-form-item class="form-item" prop="password">
        <el-input v-model="form.password" placeholder="密码" type="password" />
      </el-form-item>

      <el-form-item class="form-item" prop="checkPassword">
        <el-input v-model="form.checkPassword" placeholder="确认密码" type="password" />
      </el-form-item>

      <el-button class="submit" type="primary" @click="handleRegSubmit">
        注册
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '', // 13245676543
        captcha: '',
        nickname: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '手机验证码不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSendCaptcha () {
      if (!this.form.username) {
        this.$message.warning('手机号不能为空')
        return
      }
      this.$axios({
        url: '/captchas',
        method: 'POST',
        data: {
          tel: this.form.username
        }
      }).then((res) => {
        // console.log(res)
        const { code } = res.data
        this.$alert(`模拟手机验证码为：${code}`, '提示', {
          type: 'warning'
        })
      })
    },
    handleRegSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { checkPassword, ...props } = this.form
          console.log('props', props)
          this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data: props
          }).then((res) => {
            this.$store.commit('user/setUserInfo', res.data)
            this.$router.push('/')
          })
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
</style>
