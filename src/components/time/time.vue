<template>
  <span
    :class="classes"
    @click="handleClick"
  >{{ date }}</span>
</template>
<script>
import Locale from '../../mixins/locale';
import Time from './time';

export default {
  name: 'HTime',
  mixins: [Locale],
  props: {
    time: {
      type: [Number, Date, String],
      required: true
    },
    type: {
      type: String,
      validator(value) {
        return ['relative', 'date', 'datetime'].indexOf(value) !== -1;
      },
      default: 'relative'
    },
    hash: {
      type: String,
      default: ''
    },
    interval: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      prefix: "hn-time",
      date: ''
    };
  },
  computed: {
    classes() {
      return [
        `${this.prefix}`,
        {
          [`${this.prefix}-with-hash`]: this.hash
        }
      ];
    }
  },
  watch: {
    time() {
      // https://segmentfault.com/q/1010000021110866
      this.setTime();
    }
  },
  methods: {
    handleClick() {
      if (this.hash !== '') window.location.hash = this.hash;
    },
    setTime() {
      const type = typeof this.time;
      let time;

      if (type === 'number') {
        const timestamp = this.time.toString().length > 10 ? this.time : this.time * 1000;
        time = (new Date(timestamp)).getTime();
      } else if (type === 'object') {
        time = this.time.getTime();
      } else if (type === 'string') {
        time = (new Date(this.time)).getTime();
      }

      if (this.type === 'relative') {
        this.date = Time(time, this.t);
      } else {
        const date = new Date(this.time);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        if (this.type === 'datetime') {
          this.date = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        } else if (this.type === 'date') {
          this.date = `${year}-${month}-${day}`;
        }
      }
    }
  },
  mounted() {
    this.setTime();
    this.timer = setInterval(() => {
      this.setTime();
    }, 1000 * this.interval);
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
};
</script>
