<template>
  <div>
    <!--    <calendars :selected.sync="selected" :min="start" :max="end"/>-->
    <!--    <calendars-datepicker :selected.sync="selected" :min="start" :max="end"/>-->

    <!--        <p style="height: 50px; line-height: 50px">range</p>-->
    <!--        <div style="width: 320px">-->
    <!--          <calendars-range :start="start" :end="end" :vs.sync="vs" :vsenable="vsenable" />-->
    <!--        </div>-->

    <p style="height: 50px; line-height: 50px">rangepicker</p>
    <calendars-rangepicker :align.sync="align"
                           :vsenable.sync="vsenable"
                           :vs.sync="vs"
                           :start.sync="start"
                           :end.sync="end"
                           :shortkeys.sync="shortkeys"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
      align: '',
      vsenable: true,
      vs: true,
      start: '2020-09-01',
      end: '2020-12-20',
      shortkeys: [
        'today',
        'yesterday',
        'passed7'
      ],
    };
  },
  watch: {
    selected: {
      immediate: true,
      handler(val) {
        console.log(val)
      }
    }
  },
  methods: {
    init() {
      let that = this;
    },

  }
};
</script>

<style></style>
