<template>
  <div class="menusBox">
    <div class="header"></div>
    <el-menu :default-active="defaultActive" router class="el-menu">
      <el-menu-item index="/dashboard">
        <i class="el-icon-third-shouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-third-hongbao"></i>
          <span>红包管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/redPackageList">
            <i class="el-icon-third-liebiao"></i>
            <span>红包列表</span>
          </el-menu-item>
          <el-menu-item index="/createRedPackage">
            <i class="el-icon-third-chuangjiangongdan"></i>
            <span>创建红包</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!--<el-submenu index="1">-->
      <!--<template slot="title">-->
      <!--<i class="el-icon-third-yemian"></i>-->
      <!--<span>首页</span>-->
      <!--</template>-->
      <!--<el-menu-item-group>-->
      <!--<template slot="title">分组一</template>-->
      <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
      <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
      <!--</el-menu-item-group>-->
      <!--<el-menu-item-group title="分组2">-->
      <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
      <!--</el-menu-item-group>-->
      <!--<el-submenu index="1-4">-->
      <!--<template slot="title">选项4</template>-->
      <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
      <!--</el-submenu>-->
      <!--</el-submenu>-->
      <!--<el-menu-item index="2">-->
      <!--<i class="el-icon-menu"></i>-->
      <!--<span slot="title">导航二</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="3" disabled>-->
      <!--<i class="el-icon-document"></i>-->
      <!--<span slot="title">导航三</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="4">-->
      <!--<i class="el-icon-setting"></i>-->
      <!--<span slot="title">导航四</span>-->
      <!--</el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'Menus',
    data() {
      return {
        defaultActive: '/dashboard'
      }
    },
    watch: {
      $route(to, from) {
        this.defaultActive = to.path
      }
    },
    created() {
      this.defaultActive = this.$route.path
    },
  }
</script>

<style lang="scss" scoped>
  .menusBox {
    position: absolute;
    width: 220px;
    height: 100%;
    z-index: 11;
    background: #fff;
    border-right: 1px solid #cecece;

    .header {
      height: 64px;
      border-bottom: 1px solid #cecece;
      width: 100%;
    }

    .el-menu {
      border: 0;
    }
  }
</style>