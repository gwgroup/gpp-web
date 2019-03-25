<template>
  <el-dialog title="红包详情" :visible.sync="flag" width="40%" append-to-body :show-close="false"
    :close-on-click-modal="false">
    <el-table :data="list" border style="width: 100%" max-height="500">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column label="金额" width="180">
        <template slot-scope="scope">
          {{scope.row}}
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetList" type="primary">重新生成</el-button>
      <el-button @click="submit" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { reset } from '../../utils/utils.js'
  import { createRedPackageCardApi } from '../../utils/api/redPackage'
  export default {
    name: 'loadRedPackage',
    props: {
      flag: {
        type: Boolean,
        default: false
      },
      params: {
        type: Object,
        default: {}
      },
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        list: []
      }
    },
    created() {
      this.list = this.__generateRandomFullMoney(1, this.params.max, this.params.money, this.params.count);
    },
    methods: {
      submit() {
        createRedPackageCardApi({
          red_packet_id: this.id,
          moneys: this.list
        }).then(res => {
          if (res.code === 1000) {
            this.$emit('close')
            this.$message.success('创建成功')
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
        return result.sort((x, y) => y - x);
      },
      resetList() {
        this.list = this.__generateRandomFullMoney(1, this.params.max, this.params.money, this.params.count);
      }
    } 
  }
</script>