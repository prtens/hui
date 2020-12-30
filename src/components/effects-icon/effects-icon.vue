<template>
  <span
    class="hn-tag"
    :style="styles"
  >
    <template v-if="tip">
      <el-popover
        placement="bottom"
        trigger="hover"
        :content="tip"
      >
        <span
          slot="reference"
          class="hn-tag-name"
        >{{content}}</span>
      </el-popover>
    </template>
    <template v-else>
      <span class="hn-tag-name">{{content}}</span>
    </template>
  </span>
</template>

<script type="text/babel">
import vars from "../../styles/common/var.scss"

export default {
  name: "HEffectsIcon",
  props: {
    // icon类型，可选实心打标（solid），空心打标（hollow）
    mode: {
      type: String,
      default: "solid"
    },
    // 展示类型
    // common：灰色类型提示（默认）
    // error：红色错误类型提示
    // warn：黄色警告类型提示
    // pass：绿色通过类型提示
    // highlight：品牌色图标强调提示
    type: {
      type: String,
      default: "common"
    },
    content: {
      type: String,
      default: "打标"
    },
    // 自定义颜色，实心的背景色，空心的边框+字体颜色，设置了color的时候忽略type
    color: {
      type: String,
      default: ""
    },
    // 自定义文案颜色
    colorText: {
      type: String,
      default: ""
    },
    // hover提示信息
    tip: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    styles() {
      let that = this;

      // 优先级自定义色值color > 预置类型type
      let { color, colorText, mode, type } = that
      if (!color) {
        // 未自定义颜色的时候
        switch (type) {
          case 'common':
            switch (mode) {
              case 'solid': // 实心
                color = vars.color_text_c;
                colorText = vars.color_white;
                break;
              case 'hollow': // 空心
                color = vars.color_text_c;
                colorText = vars.color_text_9;
                break;
            }
            break;
          case 'highlight':
            color = vars.color_primary;
            break;
          case 'error':
            color = vars.color_danger;
            break;
          case 'warn':
            color = vars.color_warning;
            break;
          case 'pass':
            color = vars.color_success;
            break;
        }
      }

      let styles = [];
      switch (mode) {
        case 'solid': // 实心
          styles.push(
            `background-color: ${color}`,
            `border: 1px solid ${color}`,
            `color: ${(colorText || colorText || vars.color_white)}`
          )
          break;
        case 'hollow': // 空心
          styles.push(
            `background-color: transparent`,
            `border: 1px solid ${color}`,
            `color: ${(colorText || colorText || color)}`
          )
          break;
      }

      return styles.join(';')
    }
  }
};
</script>

<style scoped></style>
