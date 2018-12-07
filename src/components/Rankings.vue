<template>
  <div class="modal grey darken-3" id="rankings-modal">
    <div class="modal-content">
      <div class="row">
        <div class="col s6 l6">
          <h4 class="white-text font-light left-align">Rankings</h4>
        </div>
        <div class="col s6 l6">
          <a
            href="#"
            v-bind:style="btn_style"
            @click="onTieBreakerClick($event)"
            class="right btn blue waves-effect"
          >Tie Breaker</a>
        </div>
        <div class="col s12 l12">
          <p class="white-text left">{{status}}</p>
        </div>
      </div>

      <table class="white-text">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>College</th>
            <th>Average Score</th>
            <th :style="col_style">Tie Breaker Vote</th>
            <th>Rank</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="team in rankings" v-bind:key="team.team_name">
            <td>{{team.team_name}}</td>
            <td>{{team.college}}</td>
            <td>{{team.average_score}}</td>
            <td :style="col_style">{{team.tie_breaker_vote}}</td>
            <td>{{team.ranking}}</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top: 10px" class="white-text left-align">
        *Average score is the total point of the participant
        divided by the total number of judges who have submitted scores.
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import server_urls from "./../server-urls.js";
export default {
  props: ["trigger", "session_data"],
  data() {
    return {
      rankings: [],
      status: "",
      btn_style: "visibility:hidden",
      include_tie_breaker: "false",
      col_style: "display:none"
    };
  },
  mounted() {
    setInterval(() => {
      axios
        .get(server_urls.rankings + `?tiebreaker=${this.include_tie_breaker}`)
        .then(result => {
          this.rankings = result.data;
        });

      //check if all judges have made submitted a score
      axios.get(server_urls.total_votes).then(result => {
        let { total_judges, voted_judges } = result.data;
        if (total_judges === voted_judges) {
          //check if there is a tie then proceed to tie breaker
          let r = 0;
          for (let team of this.rankings) {
            //only check for ties in 3rd spot or higher
            if (r == team.ranking) {
              //there are duplicate rankings

              //check if the judge has already submitted
              axios
                .get(
                  `${server_urls.total_tie_breaker_votes}/${
                    this.session_data.judge_num
                  }`
                )
                .then(result => {
                  console.log(result);
                  let { total_judges, voted_judges, voted } = result.data;

                  if (voted_judges > 0) {
                    this.col_style = "";
                  }

                  //not all judges have voted
                  if (voted == false) {
                    this.btn_style = "";
                  } else if (total_judges == voted_judges) {
                    this.include_tie_breaker = "true";
                  }
                });
            } else {
              r = team.ranking;
            }
          }
        }
        this.status = `${voted_judges} / ${total_judges} judges voted.`;
      });
      //request updated rankings every 5 seconds
    }, 1000);
  },
  methods: {
    onTieBreakerClick() {
      $(`#rankings-modal`).modal("close");
      this.$router.push("/tiebreaker");
    }
  }
};
</script>

