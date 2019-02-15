<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col class="box">
        <h4 class="title">红包</h4>
        <div class="form-box">
          <div>
            <div class="icon"><i class="el-icon-success"></i></div>
            <div class="message">你的账户: <span>{{name}}</span> 注册成功</div>
            <div class="buttonBox">
              <el-button type="primary" @click="goLogin">返回首页</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    this.name = this.$route.params.name
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    width: 368px;
    padding-top: 64px;
    .title {
      font-size: 33px;
      font-weight: 600;
      text-align: center;
    }
    .icon{
      font-size: 64px;
      text-align: center;
      color: #52c41a;
    }
    .message{
      text-align: center;
      margin-top: 32px;
      font-size: 20px;
    }
    .buttonBox{
      text-align: center;
      margin-top: 24px;
    }
  }
</style>
