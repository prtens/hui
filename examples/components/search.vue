<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    :placeholder="placeholder"
    @select="handleSelect"
    highlight-first-item>
    <template slot-scope="props">
      <p v-if="props.item.title || props.item.name">
        <span>{{ props.item.title || props.item.name }}</span>
      </p>
    </template>
  </el-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
      state: '',
      timeout: null,
      langs: {
        'zh-CN': {
          search: '搜索文档',
          empty: '无匹配结果',
          index: 'zh'
        }
      }
    };
  },

  computed: {
    lang() {
      return this.$route.meta.lang;
    },

    placeholder() {
      return this.lang ? this.langs[this.lang].search : '';
    }
  },

  methods: {
    loadAll() {
      let routers = localStorage.getItem('HUONU_ROUTERS')
      return JSON.parse(routers);
    },
    querySearchAsync(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(val) {
      console.log(val)
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
