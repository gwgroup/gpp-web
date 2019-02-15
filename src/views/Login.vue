<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col class="box">
        <h4 class="title">红包</h4>
        <div class="form-box">
          <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
            <el-form-item prop="userName">
              <el-input prefix-icon="el-icon-third-webicon08" type="text" placeholder="请输入手机号或邮箱"
                        v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input prefix-icon="el-icon-third-mima" type="password" placeholder="请输入密码"
                        v-model="loginForm.password" autocomplete="off"
                        @keyup.enter="submitForm('loginForm')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="submit" type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
            <div class="otherActive">
              <el-button type="text">忘记密码</el-button>
              <el-button type="text" @click="goRegister">注册账户</el-button>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from '../utils/api/login'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (!this.loginForm.password) {
        callback(new Error('请输入密码!'))
      } else {
        callback()
      }
    }
    const userName = (rule, value, callback) => {
      if (!this.loginForm.username) {
        callback(new Error('请输入手机号或邮箱!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        userName: [
          { validator: userName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.loginForm).then(res => {
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goRegister () {
      this.$router.push('/register')
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
    .submit {
      width: 100%;
    }
  }

  .otherActive {
    margin-top: -10px;
    display: flex;
    justify-content: space-between;
  }
</style>
