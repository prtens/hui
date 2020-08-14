<template>
  <div>
    <calendars :selected.sync="selected" />
    <calendars-datepicker />
    
    <p style="height: 50px; line-height: 50px">rangepicker</p>
    <!--<calendars-rangepicker :align.sync="align"-->
                           <!--:vsenable.sync="vsenable"-->
                           <!--:vs.sync="vs"-->
                           <!--:start.sync="start"-->
                           <!--:end.sync="end"-->
                           <!--:shortkeys.sync="shortkeys" />-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
      align: '',
      vsenable: true,
      vs:true,
      start:'2020-08-01',
      end:'2020-08-29',
      shortkeys:[
        'today',
        'yesterday',
        'passed7'
      ],
    };
  },
  mounted() {
  },
  methods:{
    init(){
      let that = this;
    },
    
  }
};
</script>

<style></style>
