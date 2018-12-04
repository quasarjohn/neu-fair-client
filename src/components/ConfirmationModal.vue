<template>
  <div id="confirmation-modal" class="modal grey darken-3">
    <div class="modal-content">
      <h5 class="font-light white-text">{{message}}</h5>
      <div class="row" style="margin-top: 30px">
        <div class="col s6 l6">
          <a class="btn red" href="#" @click="cancel()">No</a>
        </div>
         <div class="col s6 l6">
          <a class="btn blue" href="#" @click="confirm()">Yes</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["message"],
  methods: {
    confirm() {
      this.$emit("confirm", true);
      
    },
    cancel() {
      this.$emit("confirm", true);
    }
  }
};
</script>

