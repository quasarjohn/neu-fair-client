<template>
  <div>
    
    <app-header 
    v-bind:function_label="function_label" 
    v-bind:title="title"
    @headerBtnClick="submitScores()"/>

    <div class="container row team-placeholder">
      <div
        class="col s12 l4 pointer"
        v-for="team in teams_list"
        v-bind="teams_list"
        :key="team.team_name"
        @click="onTeamClicked(team)"
      >
        <div style="height: 80px;" class="card grey darken-3 waves-block waves-effect">
          <a href="#">
            <div class="col l2 s2">
              <img
                :src="getLogoPath(team.logo)"
                :alt="getLogoPath('neu_logo.png')"
                width="50"
                height="50"
                style="margin-top: 14px"
              >
            </div>
            <div class="col l8 s8">
              <div class="outer">
                <div class="middle">
                  <div class="inner">
                    <div style="line-height:17px; margin-left:10px">
                      <p class="title white-text upper" style="line-height:5px;">{{team.team_name}}</p>
                      <p class="white-text">College of {{team.college}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s1 l1 white-text" style="margin-top:14px;">
              <h5 class="font-med">{{team.score}}</h5>
            </div>
          </a>
        </div>
      </div>
    </div>
    <score-edit-modal
      v-bind:team="selected_team"
      v-bind:edited_scores="edited_scores"
      @scoreSaved="onScoreSaved($event)"
    />
    <confirmation-modal v-bind:message="submit_confirmation_message" @confirm="onConfirm($event)"/>
    <success-modal @viewRankings="onViewRankings()"/>
    <rankings-modal v-bind:session_data="session_data"/>
  </div>
</template>
<script>
import axios from "axios";
import server_urls from "./../server-urls.js";
export default {
  data() {
    return {
      teams_list: [],
      selected_team: {},
      edited_scores: {},
      submit_confirmation_message:
        "Are you sure you want to submit these scores?",
      show_rankings: true, 
      function_label: 'Submit', 
      title: 'NEU Float Parade',
      session_data: {}
    };
  },
  mounted() {
    //get session data
    axios.get(server_urls.root, { withCredentials: true }).then(result => {
      this.session_data = result.data;
      //just a validation, if session expired, return to auth
      let { judge_num } = result.data;
      if (isNaN(judge_num)) {
        this.$router.push("/auth");
      } else {
        //good to go
        this.getTeamsList(judge_num);
      }
    });
  },
  methods: {
    getLogoPath(logo) {
      return require(`./../assets/${logo}`);
    },
    //gets list of teams with their total score
    getTeamsList(judge_num) {
      axios.get(server_urls.judge_score + `/${judge_num}`).then(result => {
        this.teams_list = result.data;
        for (let team of result.data) {
          axios
            .get(
              `${server_urls.team_score_per_criteria}/${
                team.team_name
              }/${judge_num}`
            )
            .then(result => {
              this.edited_scores[team.team_name] = result.data;

              //check if the field contain any null value
              //if there are, do not show the rankings yet

              for (let team of result.data) {
                if (team.score === null) {
                  this.show_rankings = false;
                  break;
                }
              }

              if (this.show_rankings) {
                //show ranking
                this.modal("#rankings-modal", "open", false);
              }
            });
        }
      });
    },
    onTeamClicked(team) {
      this.selected_team = team;
      $("#score-edit-modal").modal("open");
    },
    onScoreSaved(team_name) {
      let new_total_score = 0;
      for (let criteria of this.edited_scores[team_name]) {
        new_total_score += parseFloat(criteria.score);
      }

      if (isNaN(new_total_score)) {
        this.selected_team.score = null;
      } else {
        this.selected_team.score = new_total_score;
      }

      $("#score-edit-modal").modal("close");
    },
    onConfirm(confirmed) {
      $("#confirmation-modal").modal("close");

      if (confirmed) {
        //save the scores to the database
        for (let team in this.edited_scores) {
          for (let criteria of this.edited_scores[team]) {
            criteria.score = parseInt(criteria.score);

            axios
              .put(server_urls.scores, JSON.parse(JSON.stringify(criteria)))
              .then(result => {});
          }
        }

        this.modal("#success-modal", "open", false);
      }
    },
    onViewRankings() {
      this.modal("#success-modal", "close", false);
      this.modal("#rankings-modal", "open", false);
    },
    submitScores() {
      for (let key in this.edited_scores) {
        let criteria = this.edited_scores[key];

        for (let score of criteria) {
          if (score.score === null) {
            Materialize.toast("Please give score to every team.", 1000);
            this.modal("#confirmation-modal", "close", false);

            return;
          }
        }
      }
      this.modal("#confirmation-modal", "open", false);
    },
    modal(id, action, dismissible) {
      $(id).modal()[0].M_Modal.options.dismissible = dismissible;
      $(id).modal(action);
    }
  }
};
</script>
<style>
</style>


