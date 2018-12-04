<template>
  <div class="modal grey darken-3" id="success-modal">
    <div class="modal-content">
      <img src="./../assets/success.png" width="130" height="130" style="margin-bottom: 10px">
      <h3 class="white-text font-light">Scores submitted</h3>
      <div class="row">
        <!-- <div class="col s12 l6">
          <a class="btn red" style="width:180px" href="#">Log Out</a>
        </div> -->
        <div class="col s12 l12" style="margin-top: 10px">
          <a class="btn blue" style="width:180px" href="#" @click="viewRankings()">View Rankings</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    viewRankings() {
      this.$emit('viewRankings');
    }
  }
}
</script>

