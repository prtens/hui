<template>
  <div>
    <el-row>
      <p>直接使用剪贴板</p>
      <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;"/>
      <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
        复制
      </el-button>
    </el-row>

    <el-row>
      <p>通过指令使用剪贴板</p>
      <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;"/>
      <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary"
                 icon="el-icon-document">
        复制
      </el-button>
    </el-row>
  </div>
</template>

<script>
import clip from '../../src/utils/clipboard' // use clipboard directly
import clipboard from '../../src/directives/clipboard/index.js' // use clipboard by v-directive

export default {
  name: 'ClipboardDemo',
  directives: {
    clipboard
  },
  data() {
    return {
      inputData: '使用剪贴板'
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>
