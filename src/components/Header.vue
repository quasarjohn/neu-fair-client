<template>
  <div>
    <div class="row" style="padding-top:20px;">
      <div class="col l2 s4">
        <img src="./../assets/neu_logo.png" width="100" height="100">
      </div>

      <div class="col l8 s8" style="text-align:left">
        <h3 class="font-light white-text">NEU Float Parade</h3>
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
            title: 'NEU Float Parade'
        }
    }, 
    props: ['function_label'], 
    methods: {
        onHeaderBtnClick() {
            this.$emit('headerBtnClick')
        }
    }
}
</script>

