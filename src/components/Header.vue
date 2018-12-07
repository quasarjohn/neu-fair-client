<template>
  <div>
    <div class="row" style="padding-top:20px;">
      <div class="col l2 s4">
        <img src="./../assets/neu_logo.png" width="100" height="100">
      </div>

      <div class="col l8 s8" style="text-align:left">
        <h3 class="font-light white-text">{{title}}</h3>
      </div>

      <div class="col l2 s12" style="margin-top:20px">
        <div>
          <a href="#" class="btn blue" @click="onHeaderBtnClick()">{{function_label}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
        }
    }, 
    props: ['function_label', 'title'], 
    methods: {
        onHeaderBtnClick() {
            this.$emit('headerBtnClick')
        }
    }
}
</script>

