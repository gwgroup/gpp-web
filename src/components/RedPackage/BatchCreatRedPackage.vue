<template>
  <el-dialog title="批量创建现金红包卡" :visible.sync="flag" width="30%" append-to-body :show-close="false"
    :close-on-click-modal="false">
    <el-form :model="params" status-icon :rules="rules" ref="form" label-width="80px">
      <el-form-item label="使用金额" prop="money">
        <el-input v-model="params.money" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="生成数量" prop="count">
        <el-input v-model="params.count" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="最大金额">
        <el-input v-model="params.max" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  import { reset } from '../../utils/utils.js'
  import { createRedPackageCardApi } from '../../utils/api/redPackage'
  export default {
    name: 'createRedPackage',
    props: {
      flag: {
        type: Boolean,
        default: false
      },
      item: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        params: {
          money: null,
          count: null,
          max: null
        },
        rules: {
          money: [
            { required: true, message: '请输入使用金额', trigger: 'blur' },
          ],
          count: [
            { required: true, message: '请输入生成数量', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      close() {
        reset(this.params)
        this.$emit('close')
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const moneyArr = this.__generateRandomFullMoney(1, this.params.max, this.params.money, this.params.count);
            console.log(moneyArr)
            createRedPackageCardApi({
              red_packet_id: this.item.id,
              moneys: moneyArr
            }).then(res => {
              if (res.code === 1000) {
                this.$emit('submit')
                this.$message.success('创建成功')
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      __generateRandomFullMoney(min = 1, max, total, count) {
        var result = [];
        var last = total - min * count;
        if (!max) { max = last / 2; }
        max--;
        // 80
        for (var i = 0; i < count - 1; i++) {
          //let avg = last/(count-i);
          var get = parseFloat((Math.random() * (last >= max ? max : last) + min).toFixed(2));
          last = last - get + min;
          last = last > 0 ? last : 0;
          result.push(get);
        }
        result.push(parseFloat((last + min).toFixed(2)));
        return result;
      }
    }
  }
</script>