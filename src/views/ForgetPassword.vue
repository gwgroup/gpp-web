<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col class="box">
        <h4 class="title">更改密码</h4>
        <div class="registerTitle">
          <span @click="activeChange(0)" :class="`${active === 0 ? 'active': ''}`">手机号更改</span>
          <span @click="activeChange(1)" :class="`${active === 1 ? 'active': ''}`">邮箱更改</span>
        </div>
        <div class="form-box" v-if="active === 0">
          <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerMobileForm">
            <el-form-item prop="mobile">
              <el-input prefix-icon="el-icon-third-shoujihao" type="text" placeholder="请输入手机号" v-model="registerForm.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input prefix-icon="el-icon-third-mima" type="password" placeholder="请输入密码" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input prefix-icon="el-icon-third-mima" type="password" placeholder="请确认密码" v-model="registerForm.checkpass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="vali_code" class="vali_code">
              <el-row :gutter="12">
                <el-col :span="16">
                  <el-input prefix-icon="el-icon-third-yanzhengma3" type="text" placeholder="请输入验证码" v-model="registerForm.vali_code" autocomplete="off"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button class="valiButton" type="primary" @click="getMobileCode" :disabled="!!vailCodeMobileCount">{{vailCodeMobileMessage}}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button class="submit" type="primary" @click="submitForm('registerMobileForm')">确定更改</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box" v-if="active === 1">
          <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerEmailForm">
            <el-form-item prop="email">
              <el-input prefix-icon="el-icon-third-youxiang" type="text" placeholder="请输入邮箱" v-model="registerForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input prefix-icon="el-icon-third-mima" type="password" placeholder="请输入密码" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input prefix-icon="el-icon-third-mima" type="password" placeholder="请确认密码" v-model="registerForm.checkpass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="vali_code" class="vali_code">
              <el-row :gutter="12">
                <el-col :span="16">
                  <el-input prefix-icon="el-icon-third-yanzhengma3" type="text" placeholder="请输入验证码" v-model="registerForm.vali_code" autocomplete="off"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button class="valiButton" type="primary" @click="getEmailCode" :disabled="!!vailCodeEmailCount">{{vailCodeEmailMessage}}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button class="submit" type="primary" @click="submitForm('registerEmailForm')">确定更改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMobileVialCode, getEmailVialCode } from '../utils/api/register'
import { resetMobilePas, resetEmailPas } from '../utils/api/user'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (!this.registerForm.password) {
        callback(new Error('请输入密码!'))
      } else if (this.registerForm.password.length < 6) {
        callback(new Error('请输入最少6位密码!'))
      } else {
        if (this.registerForm.checkpass !== '') {
          this.$refs.registerMobileForm && this.$refs.registerMobileForm.validateField('checkPass')
          this.$refs.registerEmailForm && this.$refs.registerEmailForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (!this.registerForm.checkpass) {
        callback(new Error('请再次输入密码'))
      } else if (this.registerForm.checkpass !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const userName = (rule, value, callback) => {
      if (!this.registerForm.display_name) {
        callback(new Error('请输入昵称!'))
      } else {
        callback()
      }
    }
    const mobile = (rule, value, callback) => {
      if (!this.registerForm.mobile) {
        callback(new Error('请输入手机号!'))
      } else {
        if (/^1\d{10}$/.test(this.registerForm.mobile)) {
          callback()
        } else {
          callback(new Error('手机号格式错误!'))
        }
      }
    }
    const email = (rule, value, callback) => {
      if (!this.registerForm.email) {
        callback(new Error('请输入邮箱!'))
      } else {
        if (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.registerForm.email)) {
          callback()
        } else {
          callback(new Error('邮箱格式错误!'))
        }
      }
    }
    const valiCode = (rule, value, callback) => {
      if (!this.registerForm.vali_code) {
        callback(new Error('请输入验证码!'))
      }
      callback()
    }
    return {
      registerForm: {
        password: '',
        checkpass: '',
        vali_code: '',
        email: '',
        mobile: ''
      },
      vailCodeMobileMessage: '获取验证码',
      vailCodeEmailMessage: '获取验证码',
      vailCodeMobileCount: 0,
      vailCodeEmailCount: 0,
      registerRules: {
        userName: [
          { validator: userName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        mobile: [
          { validator: mobile, trigger: 'blur' }
        ],
        vali_code: [
          { validator: valiCode, trigger: 'blur' }
        ],
        email: [
          { validator: email, trigger: 'blur' }
        ]
      },
      active: 0,
      timerMobile: null,
      timerEmail: null
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.registerForm.email) {
            resetEmailPas(this.registerForm).then(res => {
              // this.$router.push({ name: 'registerResult', params: { name: this.registerForm.email } })
              if (res.code === 1000) {
                this.$message.success('更改成功')
                window.localStorage.removeItem('token')
                this.$router.push('/login')
              }
            })
          } else {
            resetMobilePas(this.registerForm).then(res => {
              if (res.code === 1000) {
                this.$message.success('更改成功')
                window.localStorage.removeItem('token')
                this.$router.push('/login')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    activeChange (type) {
      if (Number(type) !== this.active) {
        this.$confirm('此操作将无法保留此前所填写信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.active = Number(type)
          this.registerForm = {
            display_name: '',
            password: '',
            checkpass: '',
            vali_code: '',
            email: '',
            mobile: ''
          }
          this.vailCodeMobileMessage = '获取验证码'
          this.vailCodeEmailMessage = '获取验证码'
          this.vailCodeMobileCount = 0
          this.vailCodeEmailCount = 0
          clearInterval(this.timerMobile)
          clearInterval(this.timerEmail)
          this.$refs.registerEmailForm && this.$refs.registerEmailForm.resetFields()
          this.$refs.registerMobileForm && this.$refs.registerMobileForm.resetFields()
        })
      }
    },
    getMobileCode () {
      this.$refs.registerMobileForm.validateField('mobile')
      if (/^1\d{10}$/.test(this.registerForm.mobile)) {
        this.vailCodeMobileCount = 120
        this.vailCodeMobileMessage = this.vailCodeMobileCount + '秒'
        this.mobileCount()
        getMobileVialCode({ mobile: this.registerForm.mobile })
      }
    },
    mobileCount () {
      this.timerMobile = setInterval(() => {
        if (this.vailCodeMobileCount > 0) {
          this.vailCodeMobileCount--
          this.vailCodeMobileMessage = this.vailCodeMobileCount + '秒'
        } else {
          clearInterval(this.timerMobile)
          this.vailCodeMobileMessage = '重新获取'
        }
      }, 1000)
    },
    getEmailCode () {
      this.$refs.registerEmailForm.validateField('email')
      if (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.registerForm.email)) {
        this.vailCodeEmailCount = 120
        this.vailCodeEmailMessage = this.vailCodeEmailCount + '秒'
        this.emailCount()
        getEmailVialCode({ email: this.registerForm.email })
      }
    },
    emailCount () {
      this.timerEmail = setInterval(() => {
        if (this.vailCodeEmailCount > 0) {
          this.vailCodeEmailCount--
          this.vailCodeEmailMessage = this.vailCodeEmailCount + '秒'
        } else {
          clearInterval(this.timerEmail)
          this.vailCodeEmailMessage = '重新获取'
        }
      }, 1000)
    },
    goLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .box{
    width: 368px;
    padding-top: 64px;
    .title{
      font-size: 33px;
      font-weight: 600;
      text-align: center;
    }
    .submit{
      width: 100%;
    }
  }
  .registerTitle{
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    span{
      padding: 12px 16px;
      display: inline-block;
      height: 100%;
      margin: 0 32px 0 0;
      box-sizing: border-box;
      position: relative;
      transition: color .3s cubic-bezier(.645,.045,.355,1);
      cursor: pointer;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      color: #333;
    }
    span.active{
      border-color: teal;
      color: teal;
    }
  }
  .valiButton{
    width: 100%;
  }
  .goLogin{
    text-align: right;
    font-size: 14px;
    color: teal;
    cursor: pointer;
  }
</style>
