<template>
    <el-dialog title="提示" :visible.sync="flag" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>

</template>

<script>
    import { reset } from '../../utils/utils.js'
    export default {
        name: 'createRedPackage',
        props: {
            flag: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                params: {
                    act_name: null,
                    send_name: null,
                    wishing: null
                }
            }
        },
        methods: {
            close() {
                reset(this.params);
                this.$emit('close')
            },
            submit() {
                reset(this.params);
                this.$emit('submit')
            },
            handleClose(done) {
                this.$confirm('确认关闭, 数据将不保存？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        },
    }
</script>