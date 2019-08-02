<template>
  <div class="header">
    <div class="main">
      <el-row type="flex" class="row-bg" justify="space-between">
        <div class="logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt="加载失败">
        </div>
        <el-row type="flex" class="navs">
          <nuxt-link to="/">
            首页
          </nuxt-link>
          <nuxt-link to="/post">
            旅游攻略
          </nuxt-link>
          <nuxt-link to="/hotel">
            酒店
          </nuxt-link>
          <nuxt-link to="/air">
            国内机票
          </nuxt-link>
        </el-row>
        <!-- 登录注册页 -->
        <div v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">
            登录/注册
          </nuxt-link>
        </div>
        <!-- 登录之后的布局 -->
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
              {{ $store.state.user.userInfo.user.nickname }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    console.log('this.$store', this.$store)
  },
  methods: {
    handleLogout () {
      const { commit } = this.$store
      commit('user/clearUserInfo')
      this.$message({
        message: '退出成功',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.header {
    height: 60px;
    box-shadow: 0 5px 3px #eee;
    .logo {
        margin-top: 9px;
        img {
            width: 156px;
            height: 42px;

        }
    }
    .main {
        width: 1000px;
        margin: 0 auto;
        height: 60px;
        line-height: 60px;
        .navs {
            flex: 1;
            margin-left: 20px;
            a {
                display: block;
                height: 60px;
                line-height: 60px;
                padding: 0 20px;
                box-sizing: border-box;
                &:hover {
                    background-color: skyblue;
                    color: #fff;
                    border-bottom: 5px solid red;
                }
            }
        }
        .el-dropdown-link {
            img {
                width: 36px;
                height: 36px;
                vertical-align: middle;
            }
        }
    }
}
        .nuxt-link-exact-active{
            background: skyblue;
            color:#fff;

            &:hover{
                color:#fff;
            }
        }
</style>
