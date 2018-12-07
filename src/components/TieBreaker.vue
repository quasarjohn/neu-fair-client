<template>
  <div>
    <app-header
      v-bind:function_label="function_label"
      v-bind:title="title"
      @headerBtnClick="submitVote()"
    />
    <h3 class="white-text font-light">{{selected_team}}</h3>

    <div class="row container">
      <div
        v-for="team in teams"
        v-bind:key="team.team_name"
        class="col s12 l6 pointer"
        @click="onTeamSelected(team)"
      >
        <div :class="team.class">
          <div class="card-content">
            <img :src="getLogoPath(team.logo)" width="120" height="120">
            <h4 class="white-text font-med">{{team.team_name}}</h4>
            <h5 class="white-text font-light">College of {{team.college}}</h5>
          </div>
        </div>
      </div>
    </div>
    <confirmation-modal v-bind:message="submit_confirmation_message" @confirm="onConfirm($event)"/>
  </div>
</template>
<script>
import axios from "axios";
import server_urls from "./../server-urls.js";
export default {
  data() {
    return {
      function_label: "Submit",
      title: "Tie Breaker",
      selected_team: undefined,
      teams: [],
      session_data: {},
      submit_confirmation_message: "Are you sure you want to cast your vote?"
    };
  },
  mounted() {
    axios.get(server_urls.root, { withCredentials: true }).then(result => {
      this.session_data = result.data;
    });

    //check how many teams are tied at the same spot
    axios.get(server_urls.tie_count).then(result => {
      for (let ranking of result.data) {
        //we have a tie
        if (ranking.team_count > 1) {
          this.title = "Tie Breaker for Position # " + ranking.ranking;
          axios
            .get(`${server_urls.rankings}?ranking=${ranking.ranking}`)
            .then(result => {
              for (let team of result.data) {
                team.class = `card grey darken-3`;
              }
              this.teams = result.data;
            });
        }
      }
    });
  },
  methods: {
    submitVote() {
      if (this.selected_team === undefined) {
        Materialize.toast("Plese select a team first.", 1000);
      } else {
        this.modal("#confirmation-modal", "open", false);
      }
    },
    getLogoPath(logo) {
      return require(`./../assets/${logo}`);
    },
    onTeamSelected(selected_team) {
      this.selected_team = selected_team.team_name;
      for (let team of this.teams) {
        if (team.team_name !== selected_team.team_name) {
          team.class = `card grey darken-3`;
        } else {
          team.class = `card grey darken-1`;
        }
      }
    },
    modal(id, action, dismissible) {
      $(id).modal()[0].M_Modal.options.dismissible = dismissible;
      $(id).modal(action);
    },
    onConfirm(confirmed) {
      if (confirmed) {
        axios
          .put(server_urls.tiebreaker, {
            team_name: this.selected_team,
            judge_num: this.session_data.judge_num,
            vote: 1
          })
          .then(result => {
            console.log(result);
            this.$router.push("/");
          });
      }
      this.modal("#confirmation-modal", "close", false);
    }
  }
};
</script>
