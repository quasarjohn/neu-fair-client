<template>
  <div id="score-edit-modal" class="modal grey darken-4">
    <div class="modal-content row">
      <div class="col s12 l2">
        <div>
          <img src="./../assets/neu_logo.png" alt width="100" height="100">
          <h2 style="margin-top: 10px" class="font-light white-text">{{total_score}}</h2>
        </div>
      </div>
      <div class="col s12 l10">
        <div class>
          <div class="col s12 l6">
            <h5 style="text-align: left;" class="white-text">{{team.team_name}}</h5>
          </div>

          <div class="col s12 l6" style="text-align:end;">
            <a class="btn blue waves-effect" href="#" @click="save()">Save</a>
          </div>

          <div
            class="col s12 l12 input-field white-text"
            v-for="criteria in edited_scores[team.team_name]"
            v-bind:key="criteria.criteria"
          >
            <input
              @keyup="validateScore(criteria.percentage, criteria.score, criteria.criteria)"
              v-bind:ref="criteria.criteria"
              type="text"
              v-model="criteria.score"
              class="validate"
            >
            <label for="last-name">{{criteria.percentage}}% -- {{criteria.criteria}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import server_urls from "./../server-urls.js";
export default {
  props: ["team", "edited_scores"],
  data() {
    return {
      total_score: ""
    };
  },
  methods: {
    save() {
      this.total_score = ''
      this.$emit("scoreSaved", this.team.team_name);
    },
    validateScore(percentage, score, ref) {
      if (isNaN(score)) {
        Materialize.toast("Only numbers are allowed.", 2000);
        this.$refs[ref][0].value = "";
      } else if (score > percentage) {
        Materialize.toast(
          "Given score cannot be more than the percentange.",
          2000
        );

        this.$refs[ref][0].value = "";
      } else {
        let r = this.$refs;
        let keys = Object.keys(r);

        let total_score = 0;
        for (let i = 0; i < keys.length; i++) {
          if (r[keys[i]][0].value !== '') {
            total_score += parseFloat(r[keys[i]][0].value);
          }
        }
        this.total_score = total_score;
      }
    }
  },
  mounted() {},
  watch: {
    //if the selected team changes, query the new selected team for its score per criteria
    team() {
      setTimeout(() => {
        let r = this.$refs;
        let keys = Object.keys(r);

        for (let i = keys.length - 1; i >= 0; i--) {
          r[keys[i]][0].focus();
        }
      }),
        1000;
    }
  }
};
</script>

