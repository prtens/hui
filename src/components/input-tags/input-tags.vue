<template>
  <div
    @click="focusNewTag()"
    :class="{
      'read-only': readOnly,
      'hn-input-tag--active': isInputActive
    }"
    class="hn-input-tag"
  >
    <span
      v-for="(tag, index) in innerTags"
      :key="index"
      class="input-tag"
    >
      <!-- <span>{{ tag }}</span> -->
      {{ tag }}
      <a
        v-if="!readOnly"
        @click.prevent.stop="remove(index)"
        class="remove"
      >
        <slot name="remove-icon" />
      </a>
    </span>
    <input
      v-if="!readOnly && !isLimit"
      ref="inputtag"
      :placeholder="placeholder"
      type="text"
      v-model="newTag"
      v-on:keydown.delete.stop="removeLastTag"
      v-on:keydown="addNew"
      v-on:blur="handleInputBlur"
      v-on:focus="handleInputFocus"
      class="new-tag"
    />
  </div>
</template>

<script type="text/babel">
const validators = {
  email: new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  url: new RegExp(
    /^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i
  ),
  text: new RegExp(/^[a-zA-Z]+$/),
  digits: new RegExp(/^[\d() \.\:\-\+#]+$/),
  isodate: new RegExp(
    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
  )
};

export default {
  name: "HInputTag",
  props: {
    // 要在输入中呈现的标签
    value: {
      type: Array,
      default: () => []
    },
    // 没有标签时显示的占位符
    placeholder: {
      type: String,
      default: ""
    },
    // 将输入设置为只读
    readOnly: {
      type: Boolean,
      default: false
    },
    // 验证
    validate: {
      type: String | Function | Object,
      default: ""
    },
    // 添加的 keys
    addTagOnKeys: {
      type: Array,
      default: function () {
        return [
          13, // Return
          188, // Comma ','
          9 // Tab
        ];
      }
    },
    addTagOnBlur: {
      type: Boolean,
      default: false
    },
    // 设置标签数量限制
    limit: {
      type: Number,
      default: -1
    },
    // 允许重复标签
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    beforeAdding: {
      type: Function
    }
  },
  data() {
    return {
      newTag: "",
      innerTags: [...this.value],
      isInputActive: false
    };
  },
  computed: {
    isLimit: function () {
      return this.limit > 0 && Number(this.limit) === this.innerTags.length;
    }
  },
  watch: {
    value() {
      this.innerTags = [...this.value];
    }
  },
  methods: {
    focusNewTag() {
      if (this.readOnly || !this.$el.querySelector(".new-tag")) {
        return;
      }
      this.$el.querySelector(".new-tag").focus();
    },
    handleInputFocus() {
      this.isInputActive = true;
    },
    handleInputBlur(e) {
      this.isInputActive = false;
      this.addNew(e);
    },
    async addNew(e) {
      const keyShouldAddTag = e
        ? this.addTagOnKeys.indexOf(e.keyCode) !== -1
        : true;
      const typeIsNotBlur = e && e.type !== "blur";
      if (
        (!keyShouldAddTag && (typeIsNotBlur || !this.addTagOnBlur)) ||
        this.isLimit
      ) {
        return;
      }
      const tag = this.beforeAdding
        ? await this.beforeAdding(this.newTag)
        : this.newTag;
      const isValid = await this.validateIfNeeded(tag);
      if (
        tag &&
        isValid &&
        (this.allowDuplicates || this.innerTags.indexOf(tag) === -1)
      ) {
        this.innerTags.push(tag);
        this.newTag = "";
        this.tagChange();
        e && e.preventDefault();
      }
    },
    validateIfNeeded(tagValue) {
      if (this.validate === "" || this.validate === undefined) {
        return true;
      }
      if (typeof this.validate === "function") {
        return this.validate(tagValue);
      }
      if (
        typeof this.validate === "string" &&
        Object.keys(validators).indexOf(this.validate) > -1
      ) {
        return validators[this.validate].test(tagValue);
      }
      if (
        typeof this.validate === "object" &&
        this.validate.test !== undefined
      ) {
        return this.validate.test(tagValue);
      }
      return true;
    },
    remove(index) {
      this.innerTags.splice(index, 1);
      this.tagChange();
    },
    removeLastTag() {
      if (this.newTag) {
        return;
      }
      this.innerTags.pop();
      this.tagChange();
    },
    tagChange() {
      this.$emit("update:tags", this.innerTags);
      this.$emit("input", this.innerTags);
    }
  }
};
</script>

<style scoped></style>