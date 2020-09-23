<template>
  <div class="anchor-wrapper">
    <div class="link-wrapper">
      <el-button type="primary" @click="changeCon">修改为Window</el-button>
      <el-button type="primary" @click="andLink">添加一个连接</el-button>
      <h-anchor :bounds="100" @on-change="handleChange" @on-select="handleSelect" :style="{right: '100px'}"
                :affix="true"
                :offset-top="30" :scroll-offset="100" :container="scrollCon" show-ink>
        <h-anchor-link v-if="(link - 1) % 30 === 0" v-for="link in 300" :key="`link${link}`" :href="`#title-${link}`"
                       :title="`title-${link}`">
          <h-anchor-link :scroll-offset="20" v-if="link === 61" href="#title-child-69" title="title-child-69"/>
        </h-anchor-link>
        <h-anchor-link :scroll-offset="200" href="#lishi" title="李氏专跳"/>
        <h-anchor-link v-if="showNewLink" href="#new-link" title="这是动态添加的连接"/>
      </h-anchor>
    </div>
    <div v-if="con === 'div'" ref="listWrapper" id="listWrapper" class="list-wrapper">
      <div style="height: 100px;"></div>
      <template v-for="i in 300">
        <h1 v-if="(i - 1) % 30 === 0" :key="`h1${i}`" :id="`title-${i}`">{{ `title-${i}` }}</h1>
        <h1 v-if="i === 69" :key="`h1${i}`" :id="`title-child-${i}`">{{ `title-${i}` }}</h1>
        <h1 v-if="i === 75" :key="`h1${i}`" :id="`title-child-${i}`">{{ `title-${i}` }}</h1>
        <p v-else :key="`p${i}`">{{ `content-row-index-${i}` }}</p>
        <el-collapse v-if="i === 3" v-model="value1" :key="`collapse-${i}`">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </template>
      <h1 id="lishi">李氏专跳</h1>
      <p v-for="i in 100" :key="`chinese-${i}`">这是信息司大是大非胜多负少的{{ i }}</p>
      <!-- <h1 id="new-link">这是新添加的哦哦哦哦哦 哦 </h1>
      <p v-for="i in 50" :key="`new-${i}`">这是信息司大是大非胜多负少的{{i}}</p> -->
    </div>
    <div v-else>
      <template v-for="i in 300">
        <h1 v-if="(i - 1) % 30 === 0" :key="`h1${i}`" :id="`title-${i}`">{{ `title-${i}` }}</h1>
        <h1 v-if="i === 69" :key="`h1${i}`" :id="`title-child-${i}`">{{ `title-${i}` }}</h1>
        <h1 v-if="i === 75" :key="`h1${i}`" :id="`title-child-${i}`">{{ `title-${i}` }}</h1>
        <p v-else :key="`p${i}`">{{ `content-row-index-${i}` }}</p>

        <el-collapse v-if="i === 3" v-model="value1" :key="`collapse-${i}`">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </template>
      <h1 id="new-link">这是新添加的哦哦哦哦哦 哦 </h1>
      <p v-for="i in 50" :key="`new-${i}`">这是信息司大是大非胜多负少的{{ i }}</p>
      <h1 id="lishi">李氏专跳</h1>
      <p v-for="i in 50" :key="`chinese-${i}`">这是信息司大是大非胜多负少的{{ i }}</p>
    </div>

  </div>
</template>
<script>
import HAnchor from '../../src/components/anchor/anchor';
import HAnchorLink from '../../src/components/anchor/anchor-link';

export default {
  components: {HAnchorLink, HAnchor},
  data() {
    return {
      container: null,
      value1: '1',
      scrollCon: '',
      con: 'div',
      showNewLink: false
    };
  },
  methods: {
    changeCon() {
      this.con = 'window';
      this.scrollCon = undefined;
    },
    handleChange(newHref, oldHref) {
      console.log(`${oldHref} => ${newHref}`);
    },
    handleSelect(href) {
      console.log(`select ${href}`);
    },
    andLink() {
      this.showNewLink = true;
    }
  },
  mounted() {
    this.scrollCon = this.$refs.listWrapper;
  }
};
</script>
<style lang="scss">
.anchor-wrapper {
  .link-wrapper {
    position: absolute;
    top: 200px;
    right: 100px;
    width: 300px;
  }

  .list-wrapper {
    height: 600px;
    overflow: auto;
  }
}
</style>
