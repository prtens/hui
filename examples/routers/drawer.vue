<template>
  <div>
    <el-radio-group v-model="direction">
      <el-radio label="ltr">从左往右开</el-radio>
      <el-radio label="rtl">从右往左开</el-radio>
      <el-radio label="ttb">从上往下开</el-radio>
      <el-radio label="btt">从下往上开</el-radio>
    </el-radio-group>

    <el-button
      @click="drawer = true"
      type="primary"
      style="margin-left: 16px;"
    >
      点我打开
    </el-button>

    <el-drawer
      title="我是标题"
      size="50%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div
        class="grid"
        style="padding: 16px 24px; margin-bottom: 10px"
      >
        <div style="margin-bottom: 10px">
          浮层HTML Code：
        </div>
        <pre class="tip-content">
            fewfewfew
          </pre>
      </div>
      <div
        class="clearfix grid"
        style="padding: 16px 24px;"
      >
        <div
          class="grid-title"
          style="margin-bottom: 10px"
        >浮层JS Code：</div>
        <pre class="tip-content">
            let Magix = require('magix');
            module.exports = Magix.View.extend({
                tmpl: '@index.html',
                render() {
                    this.updater.digest();
                },
                check() {
                    let that = this;
                    let ok = that.isValid();
                    let name = '';
                    if(ok){
                        name = that.updater.get('name');
                    }
                    return new Promise((resolve) =&gt; {
                        setTimeout(() =&gt; {
                            resolve({
                                ok,
                                data: {
                                    name
                                },
                                msg: '请按照要求填写完信息再提交'
                            })
                        }, 1000)
                    })
                }
            }, {
                dialogOptions: {
                    width: 1000
                }
            });
        </pre>
      </div>
      <div class="el-drawer__footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    }
  }
};
</script>

<style>
</style>
