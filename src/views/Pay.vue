<template>
  <div class="containWarp">
    <Breadcrumb class="breadcrumb"/>
    <el-card class="searchBox">
      <el-row :gutter="20">
        <el-col :span="6">
          <label>账户余额：</label>
          <span>¥{{info.account_money}}</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="tableCard" v-if="discountCouponList.length">
       <div slot="header" class="clearfix">
        <span>优惠券</span>
      </div>
    </el-card>
    <el-card class="tableCard">
       <div slot="header" class="clearfix">
        <span>现金账户充值</span>
      </div>
      <div class="moneyBox">
        <label>金额:</label>
        <el-input class="moneyInput" size="small" v-model="money" placeholder="请输入金额"></el-input>
      </div>
      <div class="btnsBox">
        <el-button class="weixin" @click="weixinPay">微信支付</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDiscountCouponApi, payDiscountCouponApi, payWeixinApi, payWeixinQueryApi } from '../utils/api/pay.js'
import { getUserLoad } from '../utils/api/user'
import { reset, dateFtt } from '../utils/utils.js'

export default {
  name: 'Pay',
  data () {
    return {
      params: {
      },
      info: {},
      discountCouponList: [],
      money: null
    }
  },
  components: {
  },
  mounted () {
    this.getInfo()
    getDiscountCouponApi().then(res => {
      if (res.code === 1000) {
        this.discountCouponList = res.data;
      }
    })
  },
  methods: {
    getInfo () {
      getUserLoad(this.params).then(res => {
        if (res.code === 1000) {
          this.info = res.data;
        }
      })
    },
    reset () {
      reset(this.params)
    },
    close () {
      this.createFlag = false
      this.batchCreatFlag = false
    },
    weixinPay() {
      if ((/^-?\d+\.?\d{0,2}$/.test(this.money))) {
        payWeixinApi({money: Number(this.money)}).then(res => {
          if (res.code === 1000) {
            console.log(res.data)
          }
        })
      } else {
        this.$message.warning('请输入数值最多保留两位小数')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-icon-third-hongbao1, .el-icon-tickets{
    cursor: pointer;
    font-size: 16px;
    padding-left: 9px;
  }
  .moneyBox{
    padding: 24px;
    label{
      padding-right: 12px;
    }
    .moneyInput{
      width: 120px;
    }
  }
  .btnsBox{
    padding: 24px;
    padding-top: 0;
    .weixin{
      background: #55b737;
      color: #fff;
    }
  }
</style>
