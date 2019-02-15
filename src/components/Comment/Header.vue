<template>
  <div class="headerBox">
    <el-row>
      <el-col :span="22" class="placeholder">
      </el-col>
      <el-col :span="2" class="menus">
        <el-dropdown trigger="click">
          <el-button class="dropDown">{{userLoad.display_name}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['userLoad'],
  methods: {
    logOut () {
      window.localStorage.removeItem('token');
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .headerBox {
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    height: 64px;
    width: 100%;
    padding-left: 220px;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    z-index: 10;
    .placeholder{
      height: 64px;
    }
    .menus{
      min-width: 80px;
      text-align: right;
      padding: 0px 20px;
      line-height: 64px;
      .dropDown{
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
      }
    }
  }
</style>
